"use client"

import React, { useEffect, useState } from "react";

type Paciente = {
    id: number;
    nome: string;
    especie: string;
    raca: string;
    sexo: string;
    idade: number;
    peso: number;
}

export default function Pacientes(){

    const [pacientes, setPacientes] = useState<Paciente[]>([])

    const [nome, setNome] = useState("")
    const [especie, setEspecie] = useState("")
    const [raca, setRaca] = useState("")
    const [sexo, setSexo] = useState("")
    const [idade, setIdade] = useState<string>("")
    const [peso, setPeso] = useState<string>("")

    const [idBusca, setIdBusca] = useState("")
    
    const [idEditando, setIdEditando] = useState<number | null>(null)

    const API_URL = "https://gerenciamento-clinica-backend.onrender.com/pacientes";

    useEffect(() => {
        async function carregarPacientes() {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error("Erro ao buscar pacientes.");
                }

                const data: Paciente[] = await response.json();

                setPacientes(data);
            } catch (error) {
                console.error("Erro ao carregar pacientes:", error);
            }
        }

        carregarPacientes();
    }, []);

    function limparFormulario(){
        setNome("")
        setEspecie("")
        setRaca("")
        setSexo("")
        setIdade("")
        setPeso("")
        setIdEditando(null)
    }

    async function salvarPaciente(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault()

        const dadosPaciente = {
            nome,
            especie,
            raca,
            sexo,
            idade: Number(idade),
            peso: Number(peso),
        }

        try {
            if(idEditando !== null){
                const response = await fetch(`${API_URL}/${idEditando}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type" : "application/json",
                        },
                        body: JSON.stringify(dadosPaciente)
                    }
                )

                if(!response.ok){
                    throw new Error("Erro ao modificar paciente.")
                }

                alert("Paciente modificado com sucesso!")
            } else {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(dadosPaciente)
                })

                if(!response.ok){
                    throw new Error("Erro ao cadastrar paciente.")
                }

                alert("Paciente cadastrado com sucesso!")
            }

            limparFormulario()
            listarTodas()

        } catch (error) {
            console.error("Erro ao salvar paciente:", error)
        }
    }

    async function consultarPorId() {
        if(!idBusca){
            alert("Digite um ID.")
            return
        }

        try {
            const response = await fetch(`${API_URL}/${idBusca}`)

            if(!response.ok){
                alert("Paciente não encontrado!")
                return
            }

            const paciente: Paciente = await response.json()

            setPacientes([paciente])
        } catch (error) {
            console.error("Erro ao consultar paciente:", error)
            alert("Erro ao consultar paciente.")
        }
    }

    async function listarTodas() {
        try {
            setIdBusca("")

            const response = await fetch(API_URL)

            if(!response.ok){
                throw new Error("Erro ao buscar pacientes.")
            }

            const data: Paciente[] = await response.json()
            setPacientes(data)

        } catch (error) {
            console.error("Erro ao listar pacientes:", error)
            alert("Erro ao listar pacientes.")
        }
    }

    async function excluirPaciente(id: number) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este paciente?"
        )

        if(!confirmar){
            return
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if(!response.ok){
                throw new Error("Erro ao excluir paciente.")
            }
            alert("Paciente excluído com sucesso!")
            listarTodas()

        } catch (error) {
            console.error("Erro ao excluir paciente:", error)
            alert("Erro ao excluir paciente.")
        }
    }

    function editarPaciente(paciente: Paciente){
        setIdEditando(paciente.id)
        setNome(paciente.nome)
        setEspecie(paciente.especie)
        setRaca(paciente.raca)
        setSexo(paciente.sexo)
        setIdade(String(paciente.idade))
        setPeso(String(paciente.peso))
    }

    return(
        <main className="min-h-screen bg-slate-300 px-4 py-10">
            <div className="mx-auto max-w-6xl">
        
                <div className="mb-8 text-center">
                    <div className="mb-3 text-5xl">
                        🐶
                    </div>
        
                    <h1 className="text-4xl font-bold text-blue-900">
                        Pacientes
                    </h1>
        
                    <p className="mt-2 text-slate-600">
                        Cadastre, consulte e gerencie os pacientes.
                    </p>
                </div>
        
                <section className="mb-8 rounded-2xl bg-fuchsia-200 p-6 shadow-lg">
                    <h2 className="mb-6 text-2xl font-bold text-slate-800">
                        {idEditando !== null
                            ? "Editar Paciente"
                            : "Cadastrar Paciente"}
                    </h2>
        
                    <form
                        onSubmit={salvarPaciente}
                        className="grid gap-5 md:grid-cols-2"
                    >
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Nome
                            </label>
        
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Nome do paciente"
                                required
                                className="w-full rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
        
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Espécie
                            </label>
        
                            <input
                                type="text"
                                value={especie}
                                onChange={(e) => setEspecie(e.target.value)}
                                placeholder="Ex: Cachorro"
                                required
                                className="w-full rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
        
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Raça
                            </label>
        
                            <input
                                type="text"
                                value={raca}
                                onChange={(e) => setRaca(e.target.value)}
                                placeholder="Ex: Pastor Alemão"
                                required
                                className="w-full rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
        
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Sexo
                            </label>
        
                            <select
                                value={sexo}
                                onChange={(e) => setSexo(e.target.value)}
                                required
                                className="w-full rounded-lg border text-black border-slate-300 bg-slate-100 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="">Selecione</option>
                                <option value="Macho">Macho</option>
                                <option value="Fêmea">Fêmea</option>
                            </select>
                        </div>
        
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Idade
                            </label>
        
                            <input
                                type="number"
                                value={idade}
                                onChange={(e) => setIdade(e.target.value)}
                                placeholder="EX: 5"
                                min="0"
                                required
                                className="w-full rounded-lg border bg-slate-100 text-black border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
        
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Peso (Kg)
                            </label>
        
                            <input
                                type="number"
                                value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                                placeholder="Ex: 5,2"
                                min="0"
                                step="0.1"
                                required
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
                        Procurar Paciente Por ID
                    </h2>
        
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            type="number"
                            placeholder="Digite o ID"
                            value={idBusca}
                            onChange={(e) => setIdBusca(e.target.value)}
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
                            Pacientes Cadastrados
                        </h2>
        
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                            {pacientes.length}{" "}
                            {pacientes.length === 1
                                ? "paciente"
                                : "pacientes"}
                        </span>
                    </div>
        
                    {pacientes.length === 0 ? (
                        <div className="rounded-xl bg-slate-50 p-8 text-center">
                            <div className="mb-3 text-4xl">
                                🐾
                            </div>
        
                            <p className="text-slate-500">
                                Nenhum paciente cadastrado.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {pacientes.map((paciente) => (
                                <div
                                    key={paciente.id}
                                    className="rounded-xl border border-slate-200 bg-slate-100 p-5 transition hover:border-blue-300 hover:shadow-md"
                                >
                                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                                                    ID: {paciente.id}
                                                </span>
        
                                                <h3 className="text-xl font-bold text-slate-800">
                                                    {paciente.nome}
                                                </h3>
                                            </div>
        
                                            <div className="grid gap-1 text-sm text-slate-600 sm:grid-cols-2">
                                                <p>
                                                    <strong>Espécie:</strong>{" "}
                                                    {paciente.especie}
                                                </p>
        
                                                <p>
                                                    <strong>Raça:</strong>{" "}
                                                    {paciente.raca}
                                                </p>
        
                                                <p>
                                                    <strong>Sexo:</strong>{" "}
                                                    {paciente.sexo}
                                                </p>
        
                                                <p>
                                                    <strong>Idade:</strong>{" "}
                                                    {paciente.idade} anos
                                                </p>
        
                                                <p>
                                                    <strong>Peso:</strong>{" "}
                                                    {paciente.peso} kg
                                                </p>
                                            </div>
                                        </div>
        
                                        <div className="flex gap-2 border-t border-gray-400 pt-4">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    editarPaciente(paciente)
                                                }
                                                className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white transition hover:bg-amber-600"
                                            >
                                                Editar
                                            </button>
        
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    excluirPaciente(
                                                        paciente.id
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
    );
}