
class Time {
    render() {
        const whattime = new Date().toLocaleTimeString()
        
        return(
            <div>
                <h2>It is {whattime}.</h2>
            </div>
        )
    }

    tick() {
       
        //fReactDOM.render(element, document.getElementById('root'));
    }
      
    
}

export default Time