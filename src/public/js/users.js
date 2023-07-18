function changeUserRole(userId, isChecked) {    
    console.log(userId)
  
    fetch(`http://localhost:8080/api/users/premium/${userId}`, {
        method: 'POST',
        body: JSON.stringify({ id: userId }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then(response => {
    if (response.ok) {
        location.reload();
    } else {
        throw new Error('Error en la solicitud POST');
    }
    })
    .then(data => console.log(data))
      
  }