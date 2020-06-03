export default {
    unready: 0,
    ready: 1,
    start: 10,
    started: 15,
    myTurn: 100,
    waiting: 110,       // end turn, waiting for msg from server
    drop: 200,
    watching: 900,       // dropped,

    get playing(){
        return [
            this.start,
            this.started,
            this.myTurn,
            this.waiting,
            this.drop,
            this.watching
        ];
    }
};