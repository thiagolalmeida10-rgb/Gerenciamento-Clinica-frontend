"use client"

import React, { useEffect, useState } from "react";

type Tutor = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
}

export default function Tutores(){

    const [tutores, setTutores] = useState<Tutor[]>([])

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")

    const [idBusca, setIdBusca] = useState("")
        
    const [idEditando, setIdEditando] = useState<number | null>(null)

    const API_URL = "https://gerenciamento-clinica-frontend.onrender.com//tutores";

    useEffect(() => {
        async function carregarTutores() {
            try {
                const response = await fetch(API_URL);
    
                if (!response.ok) {
                    throw new Error("Erro ao buscar tutores.");
                }
    
                const data: Tutor[] = await response.json();
    
                setTutores(data);
            } catch (error) {
                console.error("Erro ao carregar tutores:", error);
            }
        }
    
        carregarTutores();
    }, []);

    function limparFormulario(){
        setNome("")
        setEmail("")
        setTelefone("")
        setEndereco("")
        setIdEditando(null)
    }

    async function salvarTutor(
        e: React.FormEvent<HTMLFormElement>
    ) {
       e.preventDefault()
       
       const dadosTutor = {
            nome,
            email,
            telefone,
            endereco,
       }

       try {
            if(idEditando !== null){
                const response = await fetch(`${API_URL}/${idEditando}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type" : "application/json",
                        },
                        body: JSON.stringify(dadosTutor)
                    }
                )

                if(!response.ok){
                    throw new Error("Erro ao midificar tutor.")
                }

                alert("Tutor modificado com sucesso!")
            } else {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(dadosTutor)
                })

                if(!response.ok){
                    throw new Error("Erro ao cadastrar tutor.")
                }
                alert("Tutor cadastrado com sucesso!")
            }

            limparFormulario()
            listarTodas()

       } catch (error) {
        console.error("Erro ao salvar tutor:", error)
       }
    }

    async function consultarPorId() {
        if(!idBusca){
            alert("Digite um ID")
            return
        }

        try {
            const response =  await fetch(`${API_URL}/${idBusca}`)

            if(!response.ok){
                alert("Tutor não encontrado!")
                return
            }

            const tutor: Tutor = await response.json()
            setTutores([tutor])

        } catch (error) {
            console.error("Erro ao consulatar tutor:", error)
            alert("Erro ao consultar tutor.")
        }
    }

    async function listarTodas() {
        try {
            setIdBusca("")

            const response = await fetch(API_URL)

            if(!response.ok){
                throw new Error("Erro ao buscar tutor.")
            }

            const data: Tutor[] = await response.json()
            setTutores(data)
        } catch (error) {
            console.error("Erro ao listar tutores:", error)
            alert("Erro ao listar tutores.")
        }
    }

    async function excluirTutor(id: number) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este Tutor?"
        )
        
        if(!confirmar){
            return
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            })

            if(!response.ok){
                throw new Error("Erro ao excluir tutor.")
            }
            alert("Tutor excluído com sucesso!")
            listarTodas()

        } catch (error) {
            console.error("Erro ao excluir tutor:", error)
            alert("Erro ao excluir tutor.")
        }
    }

    function editarTutor(tutor: Tutor){
        setIdEditando(tutor.id)
        setNome(tutor.nome)
        setEmail(tutor.email)
        setTelefone(tutor.telefone)
        setEndereco(tutor.endereco)
    }

    return(
        <main className="min-h-screen bg-gray-300 px-4 py-8">
            <div className="mx-auto max-w-5xl">
                
                <div className="mb-8 text-center">
                    <div className="mb-3 text-5xl">
                        👤
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Tutores
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Tutores da clínica.
                    </p>
                </div>
        
                <div className="rounded-xl bg-fuchsia-200 p-6 shadow-sm ring-1 ring-gray-200">
                    <h2 className="mb-6 text-xl font-semibold text-gray-800">
                        Cadastrar Tutores
                    </h2>
        
                    <form onSubmit={salvarTutor} className="space-y-5">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Nome
                            </label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Nome do tutor"
                                required
                                className="w-full rounded-lg border bg bg-slate-100 text-black border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
        
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="EX: contato@gmail.com"
                                required
                                className="w-full rounded-lg border bg-slate-100 text-black border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
        
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Telefone
                            </label>
                            <input
                                type="text"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                placeholder="(87)9 9999-9999"
                                required
                                className="w-full rounded-lg border bg-slate-100 text-black border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
        
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Endereço
                            </label>
                            <input
                                type="text"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                placeholder="EX: Rua das Flores, 120"
                                required
                                className="w-full rounded-lg border bg-slate-100 text-black border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
        
                        <div className="flex flex-wrap gap-3 pt-2">
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                {idEditando !== null
                                    ? "Salvar Alterações"
                                    : "Cadastrar"}
                            </button>
        
                            {idEditando !== null && (
                                <button
                                    type="button"
                                    onClick={limparFormulario}
                                    className="rounded-lg bg-gray-200 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-300"
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>
        
                <div className="my-6 rounded-xl bg-fuchsia-200 p-6 shadow-sm ring-1 ring-gray-200">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">
                        Procurar Tutor Por ID
                    </h2>
        
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            type="number"
                            placeholder="Digite o ID"
                            value={idBusca}
                            onChange={(e) => setIdBusca(e.target.value)}
                            className="flex-1 rounded-lg border bg-slate-100 text-black border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
        
                        <button
                            type="button"
                            onClick={consultarPorId}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                        >
                            Procurar
                        </button>
        
                        <button
                            type="button"
                            onClick={listarTodas}
                            className="rounded-lg bg-gray-700 px-5 py-2.5 font-medium text-white transition hover:bg-gray-800"
                        >
                            Listar Todas
                        </button>
                    </div>
                </div>
        
                <div className="rounded-xl bg-fuchsia-200 p-6 shadow-sm ring-1 ring-gray-200">
                    <h2 className="mb-5 text-xl font-semibold text-gray-800">
                        Tutores Cadastrados
                    </h2>
        
                    {tutores.length === 0 ? (
                        <div className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">
                            Nenhum tutor cadastrado.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {tutores.map((tutor) => (
                                <div
                                    key={tutor.id}
                                    className="rounded-lg border border-gray-200 bg-gray-100 p-5 transition hover:shadow-md"
                                >
                                    <div className="grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                                        <p>
                                            <strong className="text-gray-900">
                                                ID:
                                            </strong>{" "}
                                            {tutor.id}
                                        </p>
        
                                        <p>
                                            <strong className="text-gray-900">
                                                Nome:
                                            </strong>{" "}
                                            {tutor.nome}
                                        </p>
        
                                        <p>
                                            <strong className="text-gray-900">
                                                Email:
                                            </strong>{" "}
                                            {tutor.email}
                                        </p>
        
                                        <p>
                                            <strong className="text-gray-900">
                                                Telefone:
                                            </strong>{" "}
                                            {tutor.telefone}
                                        </p>
        
                                        <p className="sm:col-span-2">
                                            <strong className="text-gray-900">
                                                Endereço:
                                            </strong>{" "}
                                            {tutor.endereco}
                                        </p>
                                    </div>
        
                                    <div className="mt-4 flex gap-2 border-t border-gray-400 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => editarTutor(tutor)}
                                            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
                                        >
                                            Editar
                                        </button>
        
                                        <button
                                            type="button"
                                            onClick={() => excluirTutor(tutor.id)}
                                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}