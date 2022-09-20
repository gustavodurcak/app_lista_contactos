import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import db from './../firebase/firebaseConfig';
import {collection, onSnapshot} from 'firebase/firestore';
import Contacto from './Contacto';

const ListaContactos = () => {
	const [contactos, cambiarContactos] = useState([]);

	useEffect(() => {
		onSnapshot(
			collection(db, 'usuarios'),
			(snapshot) => {
				// console.log('Se ejecuto snapshot');
				// console.log(snapshot.docs[0].data());

				const arregloUsuarios = snapshot.docs.map((documento) => {
					return {...documento.data(), id: documento.id}
				})

				cambiarContactos(arregloUsuarios);
			},
			(error) => {
				console.log(error);
			}
		);
	}, []);

	return (
		// Si tenemos contactos mostramos.
		contactos.length > 0 &&
			<ContenedorContactos>
					{/* Accedemos a los contactos y por cada uno cargamos el componente de contacto. */}
					{contactos.map((contacto) => (
						<Contacto
							key={contacto.id}
							id={contacto.id}
							nombre={contacto.nombre}
							correo={contacto.correo} 
						/>
					))}
			</ContenedorContactos>
	);
}

const ContenedorContactos = styled.div`
	margin-top: 40px;
`;

export default ListaContactos;