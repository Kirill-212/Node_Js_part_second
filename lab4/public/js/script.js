async function Add() {
  let send = {
    name: document.getElementById("name").value,
    phone_number: document.getElementById("phone_number").value,
  };
  let response = await fetch("http://localhost:3000/Add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(send),
  });
  if (response.ok) {
    window.location.href = "http://localhost:3000/";
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}
async function Delete(id) {
  let send = {
    id: id,
    name: document.getElementById("name1").value,
    phone_number: document.getElementById("phone_number1").value,
  };
  let response = await fetch("http://localhost:3000/Delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(send),
  });
  if (response.ok) {
    window.location.href = "http://localhost:3000/";
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}
async function Update(id) {
  let send = {
    id: id,
    name: document.getElementById("name1").value,
    phone_number: document.getElementById("phone_number1").value,
  };
  let response = await fetch("http://localhost:3000/Update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(send),
  });
  if (response.ok) {
    window.location.href = "http://localhost:3000/";
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}
function Change() {
  document.getElementById("buttonDelete").disabled = true;
}
