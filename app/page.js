"use client"
import { useState , useEffect } from "react";
export default function jogo(){

  const [pontos, setPontos] = useState(0)
  const [poderDeClique,setPoderDeClique] = useState(1)
  const [rendaPassiva, setRendaPassiva] = useState(0)

  const [jogoCarregado, setJogoCarregado] = useState(false)

  function tocarSomDeClique(){
    const audio = new Audio('')
    audio.play().catch(()=>console.log('som de compra não encontrado'))
  }

  useEffect(()=>{
    const save = localStorage.getItem('meu_jogo_save')
    if(save){
      const dadosSalvos = JSON.parse(save);
      setPontos(dadosSalvos.pontosSalvos);
      setPoderDeClique(dadosSalvos.poderSalvo);
      setRendaPassiva(dadosSalvos.rendaSalva);
    }
    setJogoCarregado(true)
  },[])

  useEffect(() => {
    if(! jogoCarregado) return;
    
    const meusDados = {
      pontosSalvos: pontos,
      poderSalvo: poderDeClique,
      rendaSalva: rendaPassiva
    };
    localStorage.setItem("meu_jogo_save",JSON.stringify(meusDados));
  },[pontos, poderDeClique, rendaPassiva, jogoCarregado])
  
  
  function comprarUpgrade(custoDoItem,poderDoItem,passivaItem){
    if(pontos >= custoDoItem){
      setPontos(pontos - custoDoItem)
      setPoderDeClique(poderDeClique + poderDoItem)
      setRendaPassiva(rendaPassiva + passivaItem)
    }else{
      alert("Você não tem Pizzas suficientes para comprar este item")
    }
  }
  const upgrades = [
    {
      id: 1,
      nome: "Chamar o Leonardo",
      custo: 50,
      descricao: "Chame o Léo! +1 Fatia de pizza por clique!",
      poder: 1,
      passivo: 0
    },
    {
      id: 2,
      nome: "MAIS PIZZA!!!",
      custo: 200,
      descricao: "Gera +5 pizzas por segundo",
      poder: 0,
      passivo : 5
    },
    {
      id: 3,
      nome: "Chamar o Donatello",
      custo: 350,
      descricao: "Chame o Donnie! +5 Fatias de pizza por clique!",
      poder: 5,
      passivo: 0
    },
    {
      id: 4,
      nome: "Ingredientes Picantes",
      custo: 500,
      descricao: "Peperonis e pimentões!",
      poder: 5,
      passivo: 5
    },
    {
      id: 5,
      nome: "Chamar o Rafael",
      custo: 850,
      descricao: "Chame o Rafa! +20 Fatias de pizza por clique!",
      poder: 20,
      passivo: 0
    },
     {
      id: 6,
      nome: "Chamar o Michelangelo",
      custo: 1200,
      descricao: "Chame o Mikey! +50 Fatias de pizza por clique! Também faz +5 pizzas por segundo!",
      poder: 50,
      passivo: 5
    }
  ]

  useEffect(()=>{
    if(rendaPassiva === 0) {return}

    const cronometro = setInterval(()=>{
      setPontos((ValorAtual)=> ValorAtual + rendaPassiva)
    },1000)

    return () => clearInterval(cronometro)

  },[rendaPassiva])


  return(
    // div main
  <div className="min-h-screen bg-lime-500 flex flex-col md:flex-row 
  text-white font-comic sans ">
    {/* Lado Esquerdo da tela*/}
    <div className="flex-1 flex flex-col items-center justify-center
    p-10 border-slate-700">
      <h2 className="text-5x3 text-slate-0 font-comic-sans tracking-widest
      uppercase mb-2">
        Rodízio de Pizza das Tartarugas Ninjas
      </h2>

      <p className="text-6x1 font-black mb-12">
        {pontos} Fatias de Pizza
      </p>
      <div onClick={() => setPontos(pontos + poderDeClique)} className="w-64 h-64 bg-slate-700 rounded-full flex items-center
      justify-center text-5x1 cursor-pointer hover:scale-100 
      active:scale-95 transition-all">
          <img src="pizza marguerita.png"/>
      </div>

    </div>

    {/*Lado direito*/}
    <div className="w-full md:w-96 bg-green-800 p-6 flex flex-col">
      <h2 className="text-2x1 font-bold mb-6 text-center border-b 
      border-slate-700 pb-4">
        Habilidades Ninja
      </h2>
      {/* Card do Upgrade */}
      <div className="flex flex-col gap-4"></div>
      {upgrades.map((item)=>(
      <div key={item.id} onClick={()=> comprarUpgrade(item.custo,item.poder,item.passivo)} className="bg-slate-700 p-4 rounded-x1 flex justify-between
      items-center hover:bg-slate-600 cursor-pointer transition">
        <div>
          <h3 className="font-bold text-lg">{item.nome}</h3>
          <p className="text-sm text-slate-400">{item.descricao}</p>
        </div>
        <div className="bg-slate-900 px-4 py-2 rounded-lg font-bold
        text-green-400">
          {item.custo} Fatias de Pizza
        </div>

      </div>
      ))}
    </div>
  </div>
  );
}