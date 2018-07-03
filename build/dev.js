let utils = require('./utils');

let mix = require('laravel-mix');
let merge = require('lodash/merge');
let Dotenv = require('dotenv-webpack');
let NotifierPlugin = require('friendly-errors-webpack-plugin');

let fs = require('fs');

module.exports = function () {
    this.env = {
        'process.env.PORT': 19199,
        'process.env.DEVELOP': true,
        'process.env.HOST': 'localhost',
        'process.env.SERVER': 'http://localhost:9000'
    };
    this.messages = [];
    this.hot = process.argv.includes('--hot');
    this.config = {
        devServer: {},
        output: {},
        plugins: []
    };

    this.getEnv = function(){
        try {
            let envPath = utils.resolve('./src/.env');
            fs.accessSync(envPath, fs.F_OK);
            let dot_env = new Dotenv({
                path: envPath,
            });
            let tmp = {};
            Object.keys(dot_env.definitions).forEach(function (key) {
                tmp[key] = JSON.parse(dot_env.definitions[key]);
            });
            this.env = merge(this.env, tmp);
        } catch (e) {
            this.messages.push('get env failed, u can copy APP_ROOT/src/.env.example to APP_ROOT/src/.env and edit self config.');
        }
    };

    this.getMock = function(){
        try {
            fs.accessSync(utils.resolve('./src/.mock'), fs.F_OK);
            mix.js(utils.resolve('./src/mock.js'), this.hot ? 'mock.js' : 'js/mock.js');
        } catch (e) {
            //u see .mock.js not .mock just help uself to easy edit mock.
            this.messages.push('get mock failed, u can copy APP_ROOT/src/.mock.example to APP_ROOT/src/.mock.js and edit self mock data.');
        }
    }

    this.baseMessage = function() {
        if(this.hot) {
            this.messages.push('You application is running here http://' + this.env['process.env.HOST'] + ':' + this.env['process.env.PORT']);
        }

        this.messages.push(`                                                     
                                                     /*[*/#include<stdio.h>//
                         #include<stdlib.h>//]++++[->++[->+>++++<<]<][(c)2013]
                        #ifndef                                           e//[o
                       #include<string.h>//]![misaka.c,size=3808,crc=d0ec3b36][
                      #define e                                           0x1//
                     typedef struct{int d,b,o,P;char*q,*p;}f;int p,q,d,b,_=0//|
                  #include __FILE__//]>>>[->+>++<<]<[-<<+>>>++<]>>+MISAKA*IMOUTO
                #undef e//[->[-<<+<+<+>>>>]<<<<<++[->>+>>>+<<<<<]>+>+++>+++[>]]b
             #define e(c)/**/if((_!=__LINE__?(_=__LINE__):0)){c;}//[20002,+[-.+]
            ,O,i=0,Q=sizeof(f);static f*P;static FILE*t;static const char*o[]={//
          "nnn40\"8oCann40notn40open %smmnnnaaFbfeccdeaEbgecbbcda6bcedd#e(bbed$bbd",
        "a6bgcdbbccd#ead$c%bcdea7bccde*b$eebbdda9bsdbeccdbbecdcbbcceed#eaa&bae$cbe",
       "e&cbdd$eldbdeedbbdede)bdcdea&bbde1bedbbcc&b#ccdee&bdcdea'bbcd)e'bad(bae&bccd",
      "e&bbda1bdcdee$bbce#b$c&bdedcd%ecdca4bhcdeebbcd#e$b#ecdcc$bccda7bbcc#e#d%c*bbda",
     ">bad/bbda"};static int S(){return(o[p][q]);}static/**/int/**/Z=0  ;void/**/z(int//
    l){if(/**/Z-l){Z=l;q++;if(p<b*5&&!S()){p+=b;q=0;}}}int main(int I,    /**/char**l){//
   d=sizeof(f*);if(1<(O=_)){b=((sizeof(o)/sizeof(char*))-1)/4;q=22; p=     0;while(p<b*5){
  /*<*/if(Z-1){d=S()>96;i=S()-(d?96:32) ;q++;if(p<b*5&&!S()){p+=b;  q=      0;}Z=1;}/*[[*/
  while(i){_=o[0][S()-97];I=_-10?b:1;   for( ;I--;)putchar(_ );if   (!      --i||d)z(~i );}
 if(p==b*5&&O){p-=b;O--;}}return 0U;   }if(! (P=( f*)calloc /*]*/  (Q        ,I)))return 1;
 {;}for(_=p=1;p<I;p++){e(q=1);while    (q<   p&&  strcmp(  l[p     ]         ,l[(q)]))++  q;
 t=stdin;if(q<p){(void)memcpy/* "      */    (&P  [p],&P   [q     ]          ,Q);continue ;}
if(strcmp(l[p],"-")){t=fopen(l         [     p]   ,"rb"   )                  ;if(!t ){{;}  ;
printf(05+*o,l[p ]);return+1;                      {;}                       }}_=b= 1<<16   ;
*&O=5;do{if(!(P[p].q=realloc   (P[p].q,(P[p].P     +=       b)+1))){return   01;}O   &=72   /
6/*][*/;P[p].o+=d=fread(P[p]      .q       +P[     p           ].       o,  1,b,t)   ;}//
 while(d==b)      ;P [p].q[       P[       p]                  .o       ]=  012;d    =0;
 e(fclose(t        )  );P         [p]      .p                  =P[      p]  .q;if    (O)
 {for(;d<P[            p]          .o     ;d=                   q+     1)    {q=     d;
  while(q<P[                        p].o&&P[                    p].q[q]-     10     ){
  q++;}b=q-d;                         _=P                         [p].        d     ;
  if(b>_){/*]b                                                                */
   P[p].d=b;}{;                                                                }
   #undef/*pqdz'.*/  e//                                                      ;
   #define/*s8qdb]*/e/**/0                                                   //
   //<<.<<.----.>.<<.>++.++<                                              .[>]
   /*P[*/P[p].b++;continue;}}}t=                                       stdout;
  for (p=1;p<I;p++){/**/if(P[p].b>i                               ){i=P[p].b;}}
 if  (O){for(p=0;p<i;p++){q=0;/*[*/while(I               >++q){_=P[q].p-P[q ].q;
b=   0;if(_<P[q ].o){while(012-*P[q].p)     {putchar(*(P[q].p++));b++;}P[q]. p++;
}   ;while (P[  q].d>b++)putchar(040);}             putchar(10);}return 0;}p   =1;
   for(;   p<I   ;p++)fwrite(P[p] .q,P[              p].o,1,t);return 0 ;}//
  #/*]     ]<.    [-]<[-]<[- ]<[    -]<               [-  ]<;*/elif  e    //b
 |(1        <<     ( __LINE__        /*               >>   \`*//45))  |     01U
            #                       /*               */     endif            //`);
    };

    this.resetDevServer = function(base){
        if (this.hot) {
            base.devServer.port = this.env['process.env.PORT'];
            base.output.publicPath = "http://" + this.env['process.env.HOST'] + ":" + this.env['process.env.PORT'] + '/'
        }
    }

    this.plugins = function(base, v){
        try {
            let envPath = utils.resolve('./src/.env');
            fs.accessSync(envPath, fs.F_OK);
            base.plugins.push(new Dotenv({
                path: envPath,
            }));
        } catch (e) {
        }

        v.messages = v.messages && Array.isArray(v.messages) ? v.messages : [];
        base.plugins.push(new NotifierPlugin({
            compilationSuccessInfo: {
                messages: [...this.messages, ...v.messages],
                notes: [
                    'power by maxilo.'
                ]
            },
        }));
    };

    this.run = function (base, v) {
        this.getEnv();
        this.getMock();
        this.baseMessage();
        this.resetDevServer(base);
        this.plugins(base, v);
        mix.webpackConfig(base);
    };

}