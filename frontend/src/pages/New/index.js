import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import styles from './styles.css';
import api from '../../services/api';

export default function New({ history }) {

    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    async function handleSubmit(e){

        e.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);
        
        await api.post('/spots', data, { headers: { user_id } });

        history.push('/dashboard');

    }

    return (
        <form onSubmit={handleSubmit}>
            
            <label 
                id="thumbnail" 
                style={{backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Selecionar imagem"/>
            </label>

            <label htmlFor="company">Empresa*</label>
            <input
                id="company"
                placeholder="Empresa"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            
            <label htmlFor="tech">Tecnologias* <span>(separadas por virgula)</span></label>
            <input
                id="tech"
                placeholder="Quais tecnologias usam"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />
            
            <label htmlFor="price">Valor da diária* <span>(em branco para gratuito)</span></label>
            <input
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>

        </form>
    )
}