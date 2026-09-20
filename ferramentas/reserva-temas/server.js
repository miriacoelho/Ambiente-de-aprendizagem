const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, 'grupos.sqlite'));
db.exec(`PRAGMA journal_mode=WAL;
CREATE TABLE IF NOT EXISTS temas (id INTEGER PRIMARY KEY, nome TEXT NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS grupos (
  id INTEGER PRIMARY KEY,
  tema_id INTEGER NOT NULL UNIQUE REFERENCES temas(id),
  integrantes TEXT NOT NULL,
  criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);`);

const temas = [
  'Sistema para restaurante', 'Sistema para cafeteria', 'Plataforma de cursos online',
  'Loja de cosméticos', 'Biblioteca escolar', 'Clínica veterinária',
  'Academia de ginástica', 'Hotel e reservas', 'Locadora de veículos',
  'Consultório odontológico', 'Farmácia', 'Cinema e venda de ingressos',
  'Organização de eventos', 'Escola de idiomas', 'Pet shop',
  'Supermercado', 'Agência de viagens', 'Oficina mecânica',
  'Sistema de doação de sangue', 'Condomínio residencial',
  'Loja de roupas', 'Laboratório de análises clínicas',
  'Sistema de transporte escolar', 'Clube esportivo',
  'Feira de produtores locais'
];
const addTema = db.prepare('INSERT OR IGNORE INTO temas (nome) VALUES (?)');
for (const tema of temas) addTema.run(tema);

function send(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(JSON.stringify(data));
}
function text(value, max) { return typeof value === 'string' ? value.trim().slice(0, max + 1) : ''; }
async function body(req) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 20000) throw new Error('O formulário é grande demais.');
  }
  try { return JSON.parse(raw); } catch { throw new Error('Dados inválidos.'); }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (req.method === 'GET' && url.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
      return fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
    }
    if (req.method === 'GET' && url.pathname === '/api/temas') {
      const rows = db.prepare(`SELECT t.id, t.nome, CASE WHEN g.id IS NULL THEN 0 ELSE 1 END AS ocupado
        FROM temas t LEFT JOIN grupos g ON g.tema_id=t.id ORDER BY t.nome COLLATE NOCASE`).all();
      return send(res, 200, rows);
    }
    if (req.method === 'POST' && url.pathname === '/api/reservar') {
      const data = await body(req);
      const temaId = Number(data.temaId);
      const integrantes = text(data.integrantes, 1000);
      if (!Number.isSafeInteger(temaId) || !db.prepare('SELECT id FROM temas WHERE id=?').get(temaId)) return send(res, 400, { erro: 'Escolha um tema válido.' });
      if (integrantes.length < 3 || integrantes.length > 1000) return send(res, 400, { erro: 'Informe os integrantes do grupo (até 1.000 caracteres).' });
      try {
        db.prepare('INSERT INTO grupos (tema_id, integrantes) VALUES (?, ?)').run(temaId, integrantes);
      } catch (e) {
        if (e.errcode === 2067) return send(res, 409, { erro: 'Este tema acabou de ser escolhido por outro grupo. Atualize a lista e escolha outro.' });
        throw e;
      }
      return send(res, 201, { mensagem: 'Tema reservado com sucesso.' });
    }
    if (req.method === 'GET' && url.pathname === '/api/exportar') {
      const admin = process.env.ADMIN_TOKEN;
      const supplied = req.headers.authorization?.replace(/^Bearer /, '') || '';
      if (!admin || !supplied || supplied.length !== admin.length || !crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(admin))) return send(res, 403, { erro: 'Acesso restrito ao docente.' });
      const rows = db.prepare(`SELECT g.id, t.nome AS tema, g.integrantes, g.criado_em
        FROM grupos g JOIN temas t ON t.id=g.tema_id ORDER BY t.nome`).all();
      return send(res, 200, rows);
    }
    send(res, 404, { erro: 'Página não encontrada.' });
  } catch (e) {
    if (e.message === 'O formulário é grande demais.' || e.message === 'Dados inválidos.') return send(res, 400, { erro: e.message });
    console.error(e);
    send(res, 500, { erro: 'Erro interno. Tente novamente.' });
  }
});
server.listen(PORT, () => console.log(`Acesse http://localhost:${PORT}`));
