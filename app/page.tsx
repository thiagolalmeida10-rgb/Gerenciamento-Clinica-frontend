"use client";

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-100 px-4 py-12">
            <div className="mx-auto max-w-5xl">

                {/* Cabeçalho */}
                <div className="mb-12 text-center">
                    <div className="mb-4 text-6xl">
                        🐾
                    </div>

                    <h1 className="text-4xl font-bold text-blue-900 md:text-5xl">
                        Clínica Veterinária
                    </h1>

                    <p className="mt-3 text-lg text-slate-600">
                        Sistema de gerenciamento veterinário
                    </p>
                </div>

                {/* Menu */}
                <nav className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Pacientes */}
                    <a
                        href="/pacientes"
                        className="group rounded-2xl bg-white p-6 text-center shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="mb-4 text-5xl">
                            🐶
                        </div>

                        <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600">
                            Pacientes
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Gerencie os animais cadastrados.
                        </p>

                        <div className="mt-5 font-semibold text-blue-600">
                            Acessar →
                        </div>
                    </a>

                    {/* Tutores */}
                    <a
                        href="/tutores"
                        className="group rounded-2xl bg-white p-6 text-center shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="mb-4 text-5xl">
                            👤
                        </div>

                        <h2 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600">
                            Tutores
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Cadastre e consulte os tutores.
                        </p>

                        <div className="mt-5 font-semibold text-emerald-600">
                            Acessar →
                        </div>
                    </a>

                    {/* Veterinários */}
                    <a
                        href="/veterinarios"
                        className="group rounded-2xl bg-white p-6 text-center shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="mb-4 text-5xl">
                            🩺
                        </div>

                        <h2 className="text-xl font-bold text-slate-800 group-hover:text-purple-600">
                            Veterinários
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Gerencie os veterinários.
                        </p>

                        <div className="mt-5 font-semibold text-purple-600">
                            Acessar →
                        </div>
                    </a>

                    {/* Clínicas */}
                    <a
                        href="/clinicas"
                        className="group rounded-2xl bg-white p-6 text-center shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="mb-4 text-5xl">
                            🏥
                        </div>

                        <h2 className="text-xl font-bold text-slate-800 group-hover:text-red-600">
                            Clínicas
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Gerencie as clínicas veterinárias.
                        </p>

                        <div className="mt-5 font-semibold text-red-600">
                            Acessar →
                        </div>
                    </a>

                </nav>

                {/* Rodapé */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-400">
                        Sistema de Clínica Veterinária
                    </p>
                </div>
            </div>
        </main>
    );
}