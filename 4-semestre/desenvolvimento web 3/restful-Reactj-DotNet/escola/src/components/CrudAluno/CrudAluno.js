import './CrudAluno.css';
import React, { useEffect, useState } from 'react';
import UserService from '../../services/UserService';

import Main from '../template/Main';

const title = "Cadastro de Alunos";

// const urlAPI = "http://localhost:5075/api/aluno";
// const urlCurso = "http://localhost:5075/api/curso";

// const initialState = {
//     aluno: { id: 0, ra: '', nome: '', codCurso: 0 },
//     lista: [],
//     curso: []

// }


export default function CrudAluno(props) {
    const [lista, setLista] = useState([]);
    const [mens, setMens] = useState([]);
    useEffect(() => {
        UserService.getProfessorBoard().then(
            (response) => {
                console.log("useEffect getProfessorBoard: " + response.data)
                setLista(response.data);
                setMens(null);
            },
            (error) => {
                const _mens =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMens(_mens);
                console.log("_mens: " + _mens);
            }
        );
    }, []);

    const renderTable = () => {
        return (
            <div className="listagem">
                <table className="listaAlunos" id="tblListaAlunos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloRa">Ra</th>
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloCurso">Curso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(
                            (aluno) =>
                                <tr key={aluno.id}>
                                    <td>{aluno.ra}</td>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.codCurso}</td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <Main title={title}>
            {(mens) ? "Problema com conexão ou autorização (contactaradministrador)." : renderTable()}
        </Main>
    )
}


// export default class CrudAluno extends Component {

//     state = { ...initialState }

//     componentDidMount() {
//         // axios(urlAPI).then(resp => {
//         //     this.setState({ lista: resp.data })
//         // })
//         axios(urlAPI, { headers: { Authorization: 'Bearer ' + user.token } })
//             .then(resp => {
//                 this.setState({ lista_aluno: resp.data });
//             },
//                 (error) => {
//                     const _mens =
//                         (error.response &&
//                             error.response.data &&
//                             error.response.data.message) ||
//                         error.message ||
//                         error.toString();
//                     this.setState({ mens: _mens });
//                 }
//             );
            
//         axios(urlCurso)
//             .then(resp => {
//                 this.setState({ curso: resp.data });
//                 console.log(resp.data)
//             })
//     }

//     limpar() {
//         this.setState({ aluno: initialState.aluno });
//     }

//     salvar() {
//         const aluno = this.state.aluno;
//         aluno.codCurso = Number(aluno.codCurso);
//         const metodo = aluno.id ? 'put' : 'post';
//         const url = aluno.id ? `${urlAPI}/${aluno.id}` : urlAPI;


//         axios[metodo](url, aluno)
//             .then(resp => {
//                 const lista = this.getListaAtualizada(resp.data)
//                 this.setState({ aluno: initialState.aluno, lista })
//             })
//     }

//     getListaAtualizada(aluno, add = true) {
//         const lista = this.state.lista.filter(a => a.id !== aluno.id);
//         if (add) lista.unshift(aluno);
//         return lista;
//     }

//     atualizaCampo(event) {
//         //clonar usuário a partir do state, para não alterar o state diretamente
//         const aluno = { ...this.state.aluno };
//         //usar o atributo NAME do input identificar o campo a ser atualizado
//         aluno[event.target.name] = event.target.value;
//         //atualizar o state
//         this.setState({ aluno });
//     }

//     carregar(aluno) {
//         this.setState({ aluno })
//     }

//     remover(aluno) {
//         const url = urlAPI + "/" + aluno.id;
//         if (window.confirm("Confirma remoção do aluno: " + aluno.ra)) {
//             console.log("entrou no confirm");
//             axios['delete'](url, aluno)
//                 .then(() => {
//                     const lista = this.getListaAtualizada(aluno, false)
//                     this.setState({ aluno: initialState.aluno, lista })
//                 })
//         }
//     }


//     renderForm() {
//         return (
//             <div className="inclui-container">
//                 <label> RA: </label>
//                 <input
//                     type="text"
//                     id="ra"
//                     placeholder="RA do aluno"
//                     className="form-input"
//                     name="ra"

//                     value={this.state.aluno.ra}

//                     onChange={e => this.atualizaCampo(e)}
//                 />
//                 <label> Nome: </label>
//                 <input
//                     type="text"
//                     id="nome"
//                     placeholder="Nome do aluno"
//                     className="form-input"
//                     name="nome"

//                     value={this.state.aluno.nome}

//                     onChange={e => this.atualizaCampo(e)}
//                 />
//                 <label>Curso: </label>
//                 <select
//                     className="select"
//                     name="codCurso"
//                     value={this.state.aluno.codCurso}
//                     onChange={e => this.atualizaCampo(e)}>

//                     <option value="disabled selected hidden">Selecione o Curso</option>

//                     {this.state.curso.map(
//                         (curso) => {
//                             return (
//                                 <option key={curso.id} value={curso.codCurso}>{curso.nomeCurso}</option>
//                             );

//                         })}

//                 </select>
//                 <button className="btnSalvar"
//                     onClick={e => this.salvar(e)} >
//                     Salvar
//                 </button>
//                 <button className="btnCancelar"
//                     onClick={e => this.limpar(e)} >
//                     Cancelar
//                 </button>
//             </div>
//         )
//     }

//     renderTable() {
//         return (
//             <div className="listagem">
//                 <table className="listaAlunos" id="tblListaAlunos">
//                     <thead>
//                         <tr className="cabecTabela">
//                             <th className="tabTituloRa">Ra</th>
//                             <th className="tabTituloNome">Nome</th>
//                             <th className="tabTituloCurso">Curso</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {
//                             this.state.lista.map(
//                                 (aluno) =>

//                                     <tr key={aluno.id}>
//                                         <td>{aluno.ra}</td>
//                                         <td>{aluno.nome}</td>
//                                         <td>{aluno.codCurso}</td>
//                                         <td>
//                                             <button onClick={() => this.carregar(aluno)} >
//                                                 Altera
//                                             </button>
//                                         </td>
//                                         <td>
//                                             <button onClick={() => this.remover(aluno)} >
//                                                 Remove
//                                             </button>
//                                         </td>
//                                     </tr>
//                             )}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
//     render() {
//         return (
//             <Main title={title}>
//                {
//                 (this.mens) ?
//                 "Erro" + this.mens :
//                 this.renderForm() && this.renderTable()
               
//                }
//             </Main>
//         )
//     }
// }