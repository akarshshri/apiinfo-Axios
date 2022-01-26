import axios from 'axios';
import React, { useEffect } from 'react';

var tempArr = [];

const updateTable = () => {

    let s = '';
    tempArr.forEach((element, index) => {
        s += `<tr>
        <th>${tempArr[index].patient_code}</th>
      <td scope="row">${element.first_name}  ${element.last_name}</td>
      <td scope="row">${element.dob}</td>
      <td scope="row">${element.mobile_no}</td>
       </tr>
       `
    });
    document.getElementById('tableBody').innerHTML = s;
}

function LoggedIn({ logout, userState, username, password, status, res }) {

    if (status === 'OK') {
        let arr = [{ usename: username, password: password, userState: userState }]
        localStorage.setItem('apiinfo', JSON.stringify(arr)) //Not Recommended to Store Password in LocalStorage
    }

    const Table = async () => {
        
        const res = await axios.post('https://myphysio.digitaldarwin.in/api/get-patient/', { "id": 1 }, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
                //Cookie: csrftoken=q0FqcIRO1do5fs8c7A5xOA0tq9PwYicn24k7Ajv7AX0oVn9FUgUwI7WLtUwXxVXE; sessionid=wjtbes2w68vagjm123nj7jreughzpzhf; jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.bdfW8B6lG7RhPmHCtO6rPgf3IYlDwAJc7LUKtfTE2eU; tran=satmis1000003
                //JS does not allow to state cookie in header to prevent unauthorized use 
            }
        })
        res.data.forEach(element => {
            tempArr.push(element);
        })
        updateTable();
    }



useEffect(() => {
        Table();

}, []);

return <div>
    <div className="row grid" style={{marginTop: '1rem'}}>
    <div className='col'><h1>Welcome</h1></div>
    <div className='col'><button className="btn btn-danger" onClick={logout}>Logout</button></div>
    </div>
    <div className='container d-flex row m-auto my-4' id='patinfo' style={{ border: 'grey medium solid' }}>
        <h3>Customer's Info</h3>
        <table className="table"  >
            <thead>
                <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Contact</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                    
                
            </tbody>
        </table>
    </div>
</div>;
}

export default LoggedIn;


