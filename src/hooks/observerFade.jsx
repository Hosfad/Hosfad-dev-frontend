const observerFade = new IntersectionObserver((entities)=>{
    entities.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show1");
        }else{
            entry.target.classList.remove("show1");
        }
    })
})
export default observerFade 