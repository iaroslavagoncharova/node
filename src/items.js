  // mock items data
const items = [
    {id: 5, name: 'porkkana'},
    {id: 6, name: 'omena'},
    {id: 19, name: 'appelsiini'},
  ];
  
  const getItems = (res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const jsonItems = JSON.stringify(items);
    res.end(`{"message": "All items", "items": ${jsonItems}}`);
  };
  
  const getItemsById = (res, id) => {
    // if item with id exists send it, otherwise send 404
    console.log('getItemsById', id);
    const item = items.find((element) => element.id == id);
    if (item) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(item));
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end('{"message": "Item not found."}');
    }
  };
  
  const postItem = (req, res) => {
    let body = [];
    req
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('req body', body);
        body = JSON.parse(body);
        // check if body is "valid"
        if (!body.name) {
          res.writeHead(400, {'Content-Type': 'application/json'});
          res.end(`{"message": "Missing data."}`);
          return;
        }
        // check id of the last item in items and add 1
        const newId = items[items.length - 1].id + 1;
        items.push({id: newId, name: body.name});
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(`{"message": "New item added."}`);
      });
  };

  const putItem = (req, res, id) => {
    const item = items.find((element) => element.id == id);
    if (item) {
        let body = [];
        req
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('req body', body);
        body = JSON.parse(body);
        // check if body is "valid"
        if (!body.name) {
          res.writeHead(400, {'Content-Type': 'application/json'});
          res.end(`{"message": "Missing data."}`);
          return;
        }
        item.name = body.name;
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(item));})
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end('{"message": "Item not found."}');
    }
  };

  const deleteItem = (res, id) => {
    console.log('deleteItemsById', id);
    const index = items.findIndex((element) => element.id == id);
    if (index) {
    items.splice(index, 1);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(`{"message":"item deleted"}`);
    }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(`{"message": "Item not found"}`);
    }
  }
    
  export {getItems, getItemsById, postItem, putItem, deleteItem};