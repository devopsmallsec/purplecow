const ping = ({ date }) => {
  return `

<!DOCTYPE html>
<html
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <title>Simple Pint</title>
  </head>
  <body>
    <h1>Testing Challenge</h1>
    <div>${date}</div>
  </body>
</html>

  `;
};

module.exports = ping;
