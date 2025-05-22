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
    let imgUrl = (user.Foto || '').trim();
    const m = imgUrl.match(/"(https?:\/\/[^"]+)"/);
    if (m) imgUrl = m[1];
    resultDiv.innerHTML = `
      <div class="info1"><b>Nome:</b> ${user.Nome}</div>
      <div class="info2"><b>Status:</b> ${user.Status}</div>
      <div class="info3"><b>RA:</b> ${user.RA}</div>
      <div class="info4"><b>Validade:</b> ${user.Validade}</div>
      <div class="info5">
        <img src="${imgUrl}" alt="Foto de ${user.Nome}" style="max-width:100%;height:auto;display:block;margin:8px auto;"/>
      </div>
    `;
  } catch {
    resultDiv.innerText = 'Erro ao carregar os dados.';
  }
}

showUserStatus();
