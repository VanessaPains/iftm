
function Card() {
    return (
        <section className="section section-gray">
            <div className="container">

                {/* Grid de cards */}
                <div className="card-grid">
                    <div className="card">PLANO DE DESENVOLVIMENTO INSTITUCIONAL</div>
                    <div className="card">PESQUISA PÚBLICA PROCESSOS IFTM</div>
                    <div className="card">LICITAÇÕES E CONTRATOS</div>
                    <div className="card">RECEITAS E DESPESAS</div>
                    <div className="card">DADOS ABERTOS</div>
                    <div className="card">TRANSPARÊNCIA E PRESTAÇÃO DE CONTAS</div>
                    <div className="card">SERVIDORES</div>
                    <div className="card">PERGUNTAS FREQUENTES</div>
                </div>

                {/* Botão extra */}
                <div className="more-info">
                    <button className="btn-info">Mais informações</button>
                </div>
            </div>
        </section>
    );
}

export default Card;
