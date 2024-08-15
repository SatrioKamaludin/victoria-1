import axios from "axios";
import { useEffect, useState } from "react";

const CustomerTable = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/customers")
            .then((response) => {
                setCustomers(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Kota</th>
                    <th>Created</th>
                    <th>Updated</th>
                </tr>
            </thead>
            <tbody>
                {customers.length > 0 ? (
                    customers.map((customer, index) => {
                        // Log customer dates for debugging
                        console.log('Created:', customer.created_at);
                        console.log('Updated:', customer.updated_at);

                        const createdDate = new Date(customer.created_at);
                        const updatedDate = new Date(customer.updated_at);

                        // Handle invalid date cases
                        const createdDateStr = createdDate.toString() === 'Invalid Date' ? 'Invalid Date' : createdDate.toLocaleString();
                        const updatedDateStr = updatedDate.toString() === 'Invalid Date' ? 'Invalid Date' : updatedDate.toLocaleString();

                        return (
                            <tr key={index}>
                                <td>{customer.no}</td>
                                <td>{customer.nama}</td>
                                <td>{customer.alamat}</td>
                                <td>{customer.kota}</td>
                                <td>{createdDateStr}</td>
                                <td>{updatedDateStr}</td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>No customers available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default CustomerTable;