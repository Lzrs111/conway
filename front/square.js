export default class Square {
    constructor(x,y,sqw){
        this.x = x
        this.y = y
        this.width=sqw
        this.height=sqw

        this.neighbours = []

        if (Math.random()>0.7) {
            this.alive = true 
        } else {
            this.alive = false
        }

        this.nextTurn = false
    }
    initialRender(ctx) {
        ctx.lineWidth = 1
        ctx.strokeStyle ="grey"
        ctx.strokeRect(this.x,this.y,this.width,this.height)

        this.render(ctx)
    }
    render(ctx){
        if (this.alive===true) {
            ctx.fillStyle="#66ff33"
            ctx.fillRect(this.x,this.y,this.width-1,this.height-1)
        } else if (this.alive ===false) {
            ctx.fillStyle="black"
            ctx.fillRect(this.x,this.y,this.width-1,this.height-1)
        }
    }
    getAliveNeighbours() {
        var an = []
        this.neighbours.forEach(e => {
            if (e.alive) {
                an.push(e)
            }
        })
        return an
    }
    determineStatus() {
        var ne = this.getAliveNeighbours()

        if (this.alive){
            if (ne.length==2 || ne.length==3){
                this.nextTurn = true
            } else {
                this.nextTurn = false
            }
        } else {
            if (ne.length==3) {
                this.nextTurn = true
            }
        }
    }
}