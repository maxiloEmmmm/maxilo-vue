
export default function(app) {
    this.booted = false;

    this.providers = [];

    this.app = app;

    this.register = function(provider) {
        this.providers.push(provider);

        provider.register(this.app)

        if (this.booted) {
            provider.boot(this.app);
        }
    }

    this.boot = async function(){
        if(this.booted) {return ;}

        for(let i = 0; i < this.providers.length; i++) {
            await this.providers[i].boot(this.app)
        }

        this.booted = true;
    }
}