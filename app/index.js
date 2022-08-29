const HTMLSkeleton = (body) => {
  let output = `
        <!DOCTYPE html>
            <html lang="en">
            <meta charset="UTF-8">
            <title>Page Title</title>
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <link rel="stylesheet" href="">
            <style>
            </style>
            <script src=""></script>
            <body>
               <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
        ${body}
    </table>
              
            </body>
            </html>
    `;
  return output;
};

const List = (list = []) => {
  let payload = list.map((item) => {
    return `<tr><td> ${item._id}</td><td> ${item.name}</td> </tr>`;
  });
  if (payload[0]) {
    payload.push(`<tr><td> </td><td> <button> Delete All </button></td> </tr>`);
    payload.push(`<tr><td> </td><td> <button> Add New </button></td> </tr>`);
  }

  let output = HTMLSkeleton(payload);
  return output;
};

module.exports = {
  List,
};
