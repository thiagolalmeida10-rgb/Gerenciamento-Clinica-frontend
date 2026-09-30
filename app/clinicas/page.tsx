"use client"

import React, { useEffect, useState } from "react";

type Clinica = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
}

export default function Clinica(){

    const [clinicas, setClinicas] = useState<Clinica[]>([])

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")

    const [idBusca, setIdBusca] = useState("")

    const [idEditando, setIdEditando] = useState<number | null>(null)

    const API_URL = "http://localhost:8080/clinicas";
         
    useEffect(() => {
        async function buscarClinicas() {
            try {
                const response = await fetch(API_URL);
    
                if (!response.ok) {
                    throw new Error("Erro ao buscar clínicas.");
                }
    
                const data: Clinica[] = await response.json();
    
                setClinicas(data);
            } catch (error) {
                console.error("Erro ao carregar clínicas:", error);
            }
        }
    
        buscarClinicas();
    }, []);

    function limparFormulario(){
        setNome("")
        setEmail("")
        setTelefone("")
        setEndereco("")
        setIdEditando(null)
    }

    async function salvarClinica(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault()

        const dadosClinica = {
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
                        body: JSON.stringify(dadosClinica),
                    }
                )

                if(!response.ok){
                    throw new Error("Erro ao modificar clínica.")
                }

                alert("Clínica modificada com sucesso!")
            } else {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(dadosClinica),
                });

                if(!response.ok){
                    throw new Error("Erro ao cadastrar clínica.")
                }

                alert("Clínica cadastrada com sucesso!");
            }

            limparFormulario()
            listarTodas()

        } catch (error) {
            console.error("Erro ao salvar clínica:", error);
        }
    }

    async function consultarPorId() {
        if (!idBusca){
            alert("Digite um ID.")
            return
        }

        try {
            const response = await fetch(`${API_URL}/${idBusca}`);

            if(!response.ok){
                alert("Clínica não encontrada!")
                return
            }

            const clinica: Clinica = await response.json()

            setClinicas([clinica])
        } catch (error) {
            console.error("Erro ao consultar clínica:", error);
            alert("Erro ao consultar clínica.");
        }
    }

    async function listarTodas(){
        try {
            setIdBusca("")

            const response = await fetch(API_URL)

            if(!response.ok){
                throw new Error("Erro ao buscar clínicas.")
            }

            const data: Clinica[] = await response.json()
            setClinicas(data)

        } catch (error) {
            console.error("Erro ao listar clínicas:", error)
            alert("Erro ao listar clínicas.")
        }
    }

    async function excluirClinica(id: number) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir esta clínica?"
        )

        if(!confirmar){
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if(!response.ok){
                throw new Error("Erro ao excluir clínica.")
            }
            alert("Clínica excluída com sucesso!")
            listarTodas()

        } catch (error) {
            console.error("Erro ao excluir clínica:", error)
            alert("Erro ao excluir clínica.")
        }
    }

    function editarClinica(clinica: Clinica){
        setIdEditando(clinica.id)
        setNome(clinica.nome)
        setEmail(clinica.email)
        setTelefone(clinica.telefone)
        setEndereco(clinica.endereco)
    }

    
    return(
        <main className="min-h-screen bg-slate-300 px-4 py-10">
            <div className="mx-auto max-w-5xl">

                <div className="mb-8 text-center">
                    <div className="mb-3 text-5xl">
                        🏥
                    </div>
                    
                    <h1 className="text-4xl font-bold text-blue-900">
                        Clínicas Veterinárias
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Clínicas veterinárias na região.
                    </p>
                </div>

                <section className="mb-8 rounded-2xl bg-fuchsia-200 p-6 shadow-lg">
                    <h2 className="mb-6 text-2xl font-bold text-slate-800">
                        {idEditando !== null
                            ? "Editar Clínica"
                            : "Cadastrar Clínica"}
                    </h2>

                    <form
                        onSubmit={salvarClinica}
                        className="grid gap-5 md:grid-cols-2"
                    >
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Nome
                            </label>

                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)
                                }
                                required
                                placeholder="Nome da clínica"
                                className="w-full rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                                placeholder="contato@clinica.com"
                                className="w-full rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Telefone
                            </label>

                            <input
                                type="text"
                                value={telefone}
                                onChange={(e) =>
                                    setTelefone(e.target.value)
                                }
                                required
                                placeholder="(87)9 9999-9999"
                                className="w-full rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Endereço
                            </label>

                            <input
                                type="text"
                                value={endereco}
                                onChange={(e) =>
                                    setEndereco(e.target.value)
                                }
                                required
                                placeholder="Rua das Flores, 100"
                                className="w-full rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <div className="flex gap-3 md:col-span-2">
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                {idEditando !== null
                                    ? "Salvar Alterações"
                                    : "Cadastrar"}
                            </button>

                            {idEditando !== null && (
                                <button
                                    type="button"
                                    onClick={limparFormulario}
                                    className="rounded-lg bg-slate-500 px-6 py-3 font-semibold text-white transition hover:bg-slate-600"
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                <section className="mb-8 rounded-2xl bg-fuchsia-200 p-6 shadow-lg">
                    <h2 className="mb-5 text-2xl font-bold text-slate-800">
                        Procurar Clínica Por ID
                    </h2>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            type="number"
                            placeholder="Digite o ID"
                            value={idBusca}
                            onChange={(e) =>
                                setIdBusca(e.target.value)
                            }
                            className="flex-1 rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />

                        <button
                            type="button"
                            onClick={consultarPorId}
                            className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Procurar
                        </button>

                        <button
                            type="button"
                            onClick={listarTodas}
                            className="rounded-lg bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                        >
                            Listar Todas
                        </button>
                    </div>
                </section>

                <section className="rounded-2xl bg-fuchsia-200 p-6 shadow-lg">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-800">
                            Clínicas Cadastradas
                        </h2>

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                            {clinicas.length}{" "}
                            {clinicas.length === 1
                                ? "clínica"
                                : "clínicas"}
                        </span>
                    </div>

                    {clinicas.length === 0 ? (
                        <div className="rounded-lg bg-slate-50 p-8 text-center">
                            <p className="text-slate-500">
                                Nenhuma clínica cadastrada.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {clinicas.map((clinica) => (
                                <div
                                    key={clinica.id}
                                    className="rounded-xl border border-slate-200 bg-slate-100 p-5 transition hover:border-blue-300 hover:shadow-md"
                                >
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                                                    ID: {clinica.id}
                                                </span>

                                                <h3 className="text-lg font-bold text-slate-800">
                                                    {clinica.nome}
                                                </h3>
                                            </div>

                                            <p className="text-sm text-slate-600">
                                                <strong>Email:</strong>{" "}
                                                {clinica.email}
                                            </p>

                                            <p className="text-sm text-slate-600">
                                                <strong>Telefone:</strong>{" "}
                                                {clinica.telefone}
                                            </p>

                                            <p className="text-sm text-slate-600">
                                                <strong>Endereço:</strong>{" "}
                                                {clinica.endereco}
                                            </p>
                                        </div>

                                        <div className="flex gap-2 border-t border-gray-400 pt-4">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    editarClinica(
                                                        clinica
                                                    )
                                                }
                                                className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white transition hover:bg-amber-600"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    excluirClinica(
                                                        clinica.id
                                                    )
                                                }
                                                className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}