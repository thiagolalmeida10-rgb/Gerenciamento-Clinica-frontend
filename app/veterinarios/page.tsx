"use client"

import React, { useEffect, useState } from "react";

type Veterinario = {
    id: number;
    nome: string;
    email: string;
    especialidade: string;
    telefone: string;
    endereco: string;
}

export default function Veterinarios(){

    const [veterinarios, setVeterinarios] = useState<Veterinario[]>([])

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [especialidade, setEspecialidade] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")

    const [idBusca, setIdBusca] = useState("")
    
    const [idEditando, setIdEditando] = useState<number | null>(null)

    const API_URL = "https://gerenciamento-clinica-frontend.onrender.com//veterinarios";
    
    useEffect(() => {
        async function carregarVeterinarios() {
            try {
                const response = await fetch(API_URL);
                    
                if (!response.ok) {
                    throw new Error("Erro ao buscar veterinários.");
                }
        
                const data: Veterinario[] = await response.json();
    
                setVeterinarios(data);
            } catch (error) {
                console.error("Erro ao carregar veterinários:", error);
            }
        }
        
        carregarVeterinarios();
    }, []);

    function limparFormulario(){
        setNome("")
        setEmail("")
        setEspecialidade("")
        setTelefone("")
        setEndereco("")
        setIdEditando(null)
    }

    async function salvatTudo(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault()

        const dadosVeterinario = {
            nome,
            email,
            especialidade,
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
                        body: JSON.stringify(dadosVeterinario)
                    }
                )

                if(!response.ok){
                    throw new Error("Erro ao modificar veterinário.")
                }

                alert("Veterinário modificado com sucesso!")
            } else {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(dadosVeterinario)
                })

                if(!response.ok){
                    throw new Error("Erro ao cadastrar veterinário.")
                }

                alert("Veterinário cadastrado com sucesso.")
            }

            limparFormulario()
            listarTodas()

        } catch (error) {
            console.error("Erro ao salvar veterinário:", error)
        }
    }

    async function consultarPorId() {
        if(!idBusca){
            alert("Digite um ID")
            return
        }

        try {
            const response = await fetch(`${API_URL}/${idBusca}`)

            if(!response.ok){
                alert("Veterinário não encontrado!")
                return
            }

            const veterinario: Veterinario = await response.json()
            setVeterinarios([veterinario])
        } catch (error) {
            console.error("Erro ao consultar veterinário:", error)
            alert("Erro ao consultar veterinário.")
        }
    }

    async function listarTodas() {
        try {
            setIdBusca("")

            const response = await fetch(API_URL)

            if(!response.ok){
                throw new Error("Erro ao buscar veterinário.")
            }

            const data: Veterinario[] = await response.json()
            setVeterinarios(data)
        } catch (error) {
            console.error("Erro ao listar veterinários:", error)
            alert("Erro ao listar veterinários.")
        }
    }

    async function excluirVeterinario(id: number) {
        const confirmar = window.confirm(
            "Tem certeza que desja excluir este veterinário?"
        )

        if(!confirmar){
            return
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            })

            if(!response.ok){
                throw new Error("Erro ao excluir veterinário.")
            }
            alert("Veterinário excluído com sucesso!")
            listarTodas()

        } catch (error) {
            console.error("Erro ao excluir veterinário:", error)
            alert("Erro ao excluir veterinário.")
        }
    }

    function editarVeterinario(veterinario: Veterinario){
        setIdEditando(veterinario.id)
        setNome(veterinario.nome)
        setEmail(veterinario.email)
        setEspecialidade(veterinario.especialidade)
        setTelefone(veterinario.telefone)
        setEndereco(veterinario.endereco)
    }

    return(
        <main className="min-h-screen bg-slate-300 px-4 py-10">
            <div className="mx-auto max-w-5xl">
                
                <div className="mb-8 text-center">
                    <div className="mb-3 text-5xl">
                        🩺
                    </div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Veterinários
                    </h1>

                    <p className="mt-1 text-slate-500">
                        Veterinários da clínica
                    </p>
                </div>
                
                <section className="rounded-xl bg-fuchsia-200 p-6 shadow-md">
                    <h2 className="mb-6 text-xl font-semibold text-slate-800">
                        Cadastrar Veterinários
                    </h2>
        
                    <form onSubmit={salvatTudo} className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Nome
                            </label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Nome do Veterinário"
                                required
                                className="w-full rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
        
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="contato@tutor.com"
                                required
                                className="w-full rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
        
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Especialidade
                            </label>
                            <input
                                type="text"
                                value={especialidade}
                                onChange={(e) => setEspecialidade(e.target.value)}
                                placeholder="EX: Dermatologia"
                                required
                                className="w-full rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
        
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Telefone
                            </label>
                            <input
                                type="text"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                placeholder="(87)9 9999-9999"
                                required
                                className="w-full rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
        
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Endereço
                            </label>
                            <input
                                type="text"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                placeholder="EX: Rua das Flores, 130"
                                required
                                className="w-full rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
        
                        <div className="flex gap-3 md:col-span-2">
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                            >
                                {idEditando !== null
                                    ? "Salvar Alterações"
                                    : "Cadastrar"}
                            </button>
        
                            {idEditando !== null && (
                                <button
                                    type="button"
                                    onClick={limparFormulario}
                                    className="rounded-lg bg-slate-200 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-300"
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </section>
        
                <section className="mt-8 rounded-xl bg-fuchsia-200 p-6 shadow-md">
                    <h2 className="mb-5 text-xl font-semibold text-slate-800">
                        Procurar Veterinário Por ID
                    </h2>
        
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            type="text"
                            placeholder="Digite o ID"
                            value={idBusca}
                            onChange={(e) => setIdBusca(e.target.value)}
                            className="flex-1 rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                            className="rounded-lg bg-slate-600 px-5 py-2.5 font-medium text-white transition hover:bg-slate-700"
                        >
                            Listar Todas
                        </button>
                    </div>
                </section>
        
                <section className="mt-8 rounded-2xl bg-fuchsia-200 p-6 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="mb-5 text-2xl font-semibold text-slate-800">
                            Veterinários Cadastrados
                        </h2>

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                            {veterinarios.length}{" "}
                            {veterinarios.length === 1
                                ? "veterinário"
                                : "veterinários"}
                        </span>
                    </div>
        
                    {veterinarios.length === 0 ? (
                        <div className="rounded-xl bg-white p-8 text-center text-slate-500 shadow-md">
                            Nenhum veterinário cadastrado.
                        </div>

                        
                    ) : (
                        <div className="space-y-4">
                            {veterinarios.map((veterinario) => (
                                <div
                                    key={veterinario.id}
                                    className="rounded-xl bg-slate-100 p-5 shadow-md transition hover:shadow-lg"
                                >
                                    <div className="grid gap-3 md:grid-cols-2">
                                        <p className="text-slate-700">
                                            <strong className="text-slate-900">
                                                ID:
                                            </strong>{" "}
                                            {veterinario.id}
                                        </p>
        
                                        <p className="text-slate-700">
                                            <strong className="text-slate-900">
                                                Nome:
                                            </strong>{" "}
                                            {veterinario.nome}
                                        </p>
        
                                        <p className="text-slate-700">
                                            <strong className="text-slate-900">
                                                Email:
                                            </strong>{" "}
                                            {veterinario.email}
                                        </p>
        
                                        <p className="text-slate-700">
                                            <strong className="text-slate-900">
                                                Especialidade:
                                            </strong>{" "}
                                            {veterinario.especialidade}
                                        </p>
        
                                        <p className="text-slate-700">
                                            <strong className="text-slate-900">
                                                Telefone:
                                            </strong>{" "}
                                            {veterinario.telefone}
                                        </p>
        
                                        <p className="text-slate-700">
                                            <strong className="text-slate-900">
                                                Endereço:
                                            </strong>{" "}
                                            {veterinario.endereco}
                                        </p>
                                    </div>
        
                                    <div className="mt-2 flex gap-3 border-t border-gray-400 pt-4">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                editarVeterinario(veterinario)
                                            }
                                            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
                                        >
                                            Editar
                                        </button>
        
                                        <button
                                            type="button"
                                            onClick={() =>
                                                excluirVeterinario(veterinario.id)
                                            }
                                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}