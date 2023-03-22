const socket = io();

socket.on("getProduct", (data) => {
  realTime.innerHTML = "";
  console.log("data");
  data.forEach((element) => { 
    realTime.innerHTML += `<tr>
             <p>Id: ${element.id}</p>
             <p>Title: ${element.title}</p>
             <p>Description: ${element.description}</p>
             <p>Price: ${element.price}</p>
             <p>Code: ${element.code}</p>
             <p>Stock: ${element.stock}</p>
             <p>Category: ${element.category}</p>
             <p>Status: ${element.status}</p>
             <p>Thumbnail: ${element.thumbnail}</p>
             </tr><br/>`
  });

  // io.emit("getProduct", data);
});