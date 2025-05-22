
              const sheetCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS9rYtAt1C25ikgZsKJKpSPrsU9XO0xYfqT0aHaG8tb-U78Dc00dx2y1MG7gW9c7g/pub?output=csv';


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
                    obj[header.trim()] = data[i].trim();
                    return obj;
                  }, {});
                });
              }



              async function showUserStatus() {
                const id = getIdFromUrl();

                
                const resultDiv = document.getElementById('user-info');
                if (!id) {
                  resultDiv.innerText = 'Por favor, informe o ID na URL. Exemplo: ?id=1';

                  return;
                }

                try {
                  const response = await fetch(sheetCsvUrl);
                  const csvText = await response.text();
                  const data = csvToArray(csvText);

                  const user = data.find(u => u.ID === id);
                  if (!user) {
                    resultDiv.innerText = 'Membro não encontrado.';
                    return;
                  }
resultDiv.innerHTML = `
<div class="info5">
    <img 
      src="${user.Foto}" 
      alt="Foto de ${user.Nome}" 
      style="max-width:100%;height:auto;"
    />
  </div>  
<div class="info1"><b>Nome:</b> ${user.Nome}</div>
  <div class="info2"><b>Status:</b> ${user.Status}</div>
  <div class="info3"><b>RA:</b> ${user.RA}</div>
  <div class="info4"><b>Validade:</b> ${user.Validade}</div>
  
`;

                } catch (err) {
                  console.error(err);
                  resultDiv.innerText = 'Erro ao carregar os dados.';
                }
              }

              showUserStatus();
