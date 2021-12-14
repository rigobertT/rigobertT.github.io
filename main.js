/////PROVIDERS
const url = 'https://dog.ceo/api/breeds/list/all';
const caja = document.querySelector('.caja');
const contain = document.querySelector('.contain');
let time;

const dogs = async ()=>{
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data.message)
    crearHtml(data.message);
}


//PAGE

const crearHtml = (data)=>{
    html = `
    <h2>selecciona</h2>
    <select name="" id="">
    <option>Selecciona</option>
    ${Object.keys(data).map( (dat) =>
      `<option>${dat}</option>`
    ).join('')}
    </select>`
    caja.innerHTML = html;

    eventos(html)
}


const eventos =  ()=>{
    
    const select = document.querySelector('select');

     select.addEventListener('change', async (e)=>{
         if(e.target.value !== 'Selecciona'){
             const response = await fetch( `https://dog.ceo/api/breed/${e.target.value}/images`)
             const data = await response.json();
             creaImg(data.message, data.message.length-1)
             
         }
        
    })
    
}

const creaImg = (images, cantidad) =>{
    
    contain.innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    `
    generarSlide(images, cantidad)
}

const generarSlide = (img, cantidad) =>{
    console.log(cantidad)
    clearInterval(time);
    let contar = 1;
    time = setInterval(()=>{
        //console.log('hola')
        contain.innerHTML = `
        <div class="slide fade-in" style="background-image: url('${img[contar]}');"></div>
       `
       if(contar < cantidad){
         contar++
       }else{
           contar = 0;
       }
        
    }, 2500)
}
///////////////////init

const init =  () =>{
    dogs();
}

init()


