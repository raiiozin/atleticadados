const sheetCsvUrl = 'https://docs.google.com/spreadsheets/d/SEU_ID/pub?output=csv';

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function csvToArray(str, delimiter = ',') {
  const lines = str.trim().split('\n');
  const headers = lines.shift().split(delimiter);
  return lines.map(line => {
    const data = line.split(delimiter);
    return headers.reduce((obj, header, i) => {
      obj[header] = data[i];
      return obj;
    }, {});
  });
}

async function showUserStatus() {
  const id = getIdFromUrl();
  const resultDiv = document.getElementById('result');
  if (!id) {
    resultDiv.innerText = 'Por favor, informe o ID na URL. Exemplo: ?id=1';
    return;
  }
  resultDiv.innerText = 'Carregando…';
  try {
    const response = await fetch(sheetCsvUrl);
    const csv = await response.text();
    const data = csvToArray(csv);
    const user = data.find(item => item.id === id);
    if (!user) {
      resultDiv.innerText = 'Membro não encontrado.';
      return;
    }
    const sheetCsvUrl = 'https://docs.google.com/spreadsheets/d/1-nbLr9U8EqzOKCEa56zJq50wwnL9CSd6/export?format=csv&gid=296187511';

function getIdFromUrl() {
  return new URLSearchParams(window.location.search).get('id');
}

function csvToArray(str, delimiter = ',') {
  const [headerLine, ...lines] = str.trim().split('\n');
  const headers = headerLine.split(delimiter);
  return lines.map(line => {
    const cells = line.split(delimiter);
    return headers.reduce((obj, h, i) => (obj[h] = cells[i], obj), {});
  });
}

async function showUserStatus() {
  const id = getIdFromUrl();
  const resultDiv = document.getElementById('result');
  if (!id) {
    resultDiv.innerText = 'Informe o ID na URL, ex: ?id=1';
    return;
  }
  resultDiv.innerText = 'Carregando…';
  try {
    const res = await fetch(sheetCsvUrl);
    const csv = await res.text();
    const data = csvToArray(csv);
    const user = data.find(u => u.id === id);
    if (!user) {
      resultDiv.innerText = 'Membro não encontrado.';
      return;
    }
    resultDiv.innerHTML = `
    <div class="info5">
        <img 
          src="${user.Foto}" 
          alt="Foto de ${user.Nome}" 
          style="max-width:100%; height:auto; display:block; margin:8px auto;"
        />
      </div>
      <div class="info1"><b>Nome:</b> ${user.Nome}</div>
      <div class="info2"><b>Status:</b> ${user.Status}</div>
      <div class="info3"><b>RA:</b> ${user.RA}</div>
      <div class="info4"><b>Validade:</b> ${user.Validade}</div>
    `;
  } catch {
    resultDiv.innerText = 'Erro ao carregar os dados.';
  }
}

showUserStatus();

  } catch {
    resultDiv.innerText = 'Erro ao carregar os dados.';
  }
}

showUserStatus();
