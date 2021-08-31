/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var __webpack_modules__={"./app/src/js/app.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n;// CONCATENATED MODULE: ./app/src/js/decorators/dom-injector.js\nfunction domInjector(seletor) {\n    return function (target, propertyKey) {\n        console.log(`Modificando protype ${target.constructor.name}\n             e adicionando getter para a propriedade ${propertyKey}`);\n        let elemento;\n        const getter = function () {\n            if (!elemento) {\n                elemento = document.querySelector(seletor);\n                console.log(`buscando elemento do DOM com o seletor \n                 ${seletor} para injetar em ${propertyKey}`);\n            }\n            return elemento;\n        };\n        Object.defineProperty(target, propertyKey, { get: getter });\n    };\n}\n\n;// CONCATENATED MODULE: ./app/src/js/decorators/inspect.js\nfunction inspect(target, propertyKey, descriptor) {\n    const metodoOriginal = descriptor.value;\n    descriptor.value = function (...args) {\n        console.log(`--- Método ${propertyKey}`);\n        console.log(`------ parâmetros: ${JSON.stringify(args)}`);\n        const retorno = metodoOriginal.apply(this, args);\n        console.log(`------ retorno: ${JSON.stringify(retorno)}`);\n        return retorno;\n    };\n    return descriptor;\n}\n\n;// CONCATENATED MODULE: ./app/src/js/decorators/logar-tempo-de-execucao.js\nfunction logarTempoDeExecucao(emSegundos = false) {\n    return function (target, propertyKey, descriptor) {\n        const metodoOriginal = descriptor.value;\n        descriptor.value = function (...args) {\n            let divisor = 1;\n            let unidade = 'milisegundos';\n            if (emSegundos) {\n                divisor = 1000;\n                unidade = 'segundos';\n            }\n            const t1 = performance.now();\n            const retorno = metodoOriginal.apply(this, args);\n            const t2 = performance.now();\n            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1) / divisor} ${unidade}`);\n            retorno;\n        };\n        return descriptor;\n    };\n}\n\n;// CONCATENATED MODULE: ./app/src/js/enums/dias-da-semana.js\nvar DiasDaSemana;\n(function (DiasDaSemana) {\n    DiasDaSemana[DiasDaSemana[\"DOMINGO\"] = 0] = \"DOMINGO\";\n    DiasDaSemana[DiasDaSemana[\"SEGUNDA\"] = 1] = \"SEGUNDA\";\n    DiasDaSemana[DiasDaSemana[\"TERCA\"] = 2] = \"TERCA\";\n    DiasDaSemana[DiasDaSemana[\"QUARTA\"] = 3] = \"QUARTA\";\n    DiasDaSemana[DiasDaSemana[\"QUINTA\"] = 4] = \"QUINTA\";\n    DiasDaSemana[DiasDaSemana[\"SEXTA\"] = 5] = \"SEXTA\";\n    DiasDaSemana[DiasDaSemana[\"SABADO\"] = 6] = \"SABADO\";\n})(DiasDaSemana || (DiasDaSemana = {}));\n\n// EXTERNAL MODULE: ./app/src/js/models/negociacao.js\nvar models_negociacao = __webpack_require__(\"./app/src/js/models/negociacao.js\");\n;// CONCATENATED MODULE: ./app/src/js/models/negociacoes.js\nclass Negociacoes {\n    constructor() {\n        this.negociacoes = [];\n    }\n    adiciona(negociacao) {\n        this.negociacoes.push(negociacao);\n    }\n    lista() {\n        return this.negociacoes;\n    }\n    paraTexto() {\n        return JSON.stringify(this.negociacoes, null, 2);\n    }\n    ehIgual(negociacoes) {\n        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista());\n    }\n}\n\n;// CONCATENATED MODULE: ./app/src/js/utils/imprimir.js\nfunction imprimir(...objetos) {\n    for (let objeto of objetos) {\n        console.log(objeto.paraTexto());\n    }\n}\n\n;// CONCATENATED MODULE: ./app/src/js/views/view.js\nclass View {\n    constructor(seletor) {\n        const elemento = document.querySelector(seletor);\n        if (elemento) {\n            this.elemento = elemento;\n        }\n        else {\n            throw Error(`Seletor ${seletor} não existe no DOM. Verifique`);\n        }\n    }\n    update(model) {\n        let template = this.template(model);\n        this.elemento.innerHTML = template;\n    }\n}\n\n;// CONCATENATED MODULE: ./app/src/js/views/mensagem-view.js\n\nclass MensagemView extends View {\n    template(model) {\n        return `\n            <p class=\"alert alert-info\">${model}</p>\n        `;\n    }\n}\n\n;// CONCATENATED MODULE: ./app/src/js/decorators/escapar.js\nfunction escapar(target, propertyKey, descriptor) {\n    const metodoOriginal = descriptor.value;\n    descriptor.value = function (...args) {\n        let retorno = metodoOriginal.apply(this, args);\n        if (typeof retorno === 'string') {\n            retorno = retorno\n                .replace(/<script>[\\s\\S]*?<\\/script>/, '');\n        }\n        return retorno;\n    };\n    return descriptor;\n}\n\n;// CONCATENATED MODULE: ./app/src/js/views/negociacoes-view.js\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\n\n\nclass NegociacoesView extends View {\n    template(model) {\n        return `\n        <table class=\"table table-hover table-bordered\">\n            <thead>\n                <tr>\n                    <th>DATA</th>\n                    <th>QUANTIDADE</th>\n                    <th>VALOR</th>\n                </tr>\n            </thead>\n            <tbody>\n                ${model.lista().map(negociacao => {\n            return `\n                        <tr>\n                            <td>${this.formatar(negociacao.data)}\n                            </td>\n                            <td>\n                                ${negociacao.quantidade}\n                            </td>\n                            <td>\n                                ${negociacao.valor}\n                            </td>\n                        </tr>\n                    `;\n        }).join('')}\n            </tbody>\n        </table>\n        `;\n    }\n    formatar(data) {\n        return new Intl.DateTimeFormat()\n            .format(data);\n    }\n}\n__decorate([\n    escapar\n], NegociacoesView.prototype, \"template\", null);\n\n;// CONCATENATED MODULE: ./app/src/js/controllers/negociacao-controller.js\nvar negociacao_controller_decorate =\n  (undefined && undefined.__decorate) ||\n  function (decorators, target, key, desc) {\n    var c = arguments.length,\n      r =\n        c < 3\n          ? target\n          : desc === null\n          ? (desc = Object.getOwnPropertyDescriptor(target, key))\n          : desc,\n      d;\n    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')\n      r = Reflect.decorate(decorators, target, key, desc);\n    else\n      for (var i = decorators.length - 1; i >= 0; i--)\n        if ((d = decorators[i]))\n          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n  };\n\n\n\n\n\n\n// import { NegociacoesService } from '../services/negociacoes-service.js';\n\n\n\nclass NegociacaoController {\n  constructor() {\n    this.negociacoes = new Negociacoes();\n    this.negociacoesView = new NegociacoesView('#negociacoesView');\n    this.mensagemView = new MensagemView('#mensagemView');\n    // this.negociacoesService = new NegociacoesService();\n    this.negociacoesView.update(this.negociacoes);\n  }\n  adiciona() {\n    const negociacao = models_negociacao.Negociacao.criaDe(\n      this.inputData.value,\n      this.inputQuantidade.value,\n      this.inputValor.value,\n    );\n    if (!this.ehDiaUtil(negociacao.data)) {\n      this.mensagemView.update('Apenas negociações em dias úteis são aceitas');\n      return;\n    }\n    this.negociacoes.adiciona(negociacao);\n    imprimir(negociacao, this.negociacoes);\n    this.limparFormulario();\n    this.atualizaView();\n  }\n  importaDados() {\n    __webpack_require__.e(/*! import() */ \"app_src_js_services_negociacoes-service_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../services/negociacoes-service.js */ \"./app/src/js/services/negociacoes-service.js\")).then((modulo) => {\n      const negociacoesService = new modulo.NegociacoesService();\n      negociacoesService\n        .obterNegociacoesDoDia()\n        .then((negociacoesDeHoje) => {\n          return negociacoesDeHoje.filter((negociacaoDeHoje) => {\n            return !this.negociacoes\n              .lista()\n              .some((negociacao) => negociacao.ehIgual(negociacaoDeHoje));\n          });\n        })\n        .then((negociacoesDeHoje) => {\n          for (let negociacao of negociacoesDeHoje) {\n            this.negociacoes.adiciona(negociacao);\n          }\n          this.negociacoesView.update(this.negociacoes);\n        });\n    });\n  }\n  ehDiaUtil(data) {\n    return (\n      data.getDay() > DiasDaSemana.DOMINGO &&\n      data.getDay() < DiasDaSemana.SABADO\n    );\n  }\n  limparFormulario() {\n    this.inputData.value = '';\n    this.inputQuantidade.value = '';\n    this.inputValor.value = '';\n    this.inputData.focus();\n  }\n  atualizaView() {\n    this.negociacoesView.update(this.negociacoes);\n    this.mensagemView.update('Negociação adicionada com sucesso');\n  }\n}\nnegociacao_controller_decorate(\n  [domInjector('#data')],\n  NegociacaoController.prototype,\n  'inputData',\n  void 0,\n);\nnegociacao_controller_decorate(\n  [domInjector('#quantidade')],\n  NegociacaoController.prototype,\n  'inputQuantidade',\n  void 0,\n);\nnegociacao_controller_decorate(\n  [domInjector('#valor')],\n  NegociacaoController.prototype,\n  'inputValor',\n  void 0,\n);\nnegociacao_controller_decorate(\n  [inspect, logarTempoDeExecucao()],\n  NegociacaoController.prototype,\n  'adiciona',\n  null,\n);\n\n;// CONCATENATED MODULE: ./node_modules/bootstrap/dist/css/bootstrap.css\n// extracted by mini-css-extract-plugin\n\n;// CONCATENATED MODULE: ./app/src/js/app.js\n\n\nconst controller = new NegociacaoController();\nconst app_form = document.querySelector('.form');\nif (app_form) {\n  app_form.addEventListener('submit', (event) => {\n    event.preventDefault();\n    controller.adiciona();\n  });\n} else {\n  throw Error(\n    'Não foi possível inicializar a aplicação. Verifique se o form existe.',\n  );\n}\n\nconst botaoImporta = document.querySelector('#botao-importa');\nif (botaoImporta) {\n  botaoImporta.addEventListener('click', () => {\n    controller.importaDados();\n  });\n} else {\n  throw Error('Botão importa não foi encontrado');\n}\n\n\n//# sourceURL=webpack://alurabank/./app/src/js/app.js_+_12_modules?")},"./app/src/js/models/negociacao.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Negociacao\": () => (/* binding */ Negociacao)\n/* harmony export */ });\nclass Negociacao {\n    constructor(_data, quantidade, valor) {\n        this._data = _data;\n        this.quantidade = quantidade;\n        this.valor = valor;\n    }\n    static criaDe(dataString, quantidadeString, valorString) {\n        const exp = /-/g;\n        const date = new Date(dataString.replace(exp, ','));\n        const quantidade = parseInt(quantidadeString);\n        const valor = parseFloat(valorString);\n        return new Negociacao(date, quantidade, valor);\n    }\n    get volume() {\n        return this.quantidade * this.valor;\n    }\n    get data() {\n        const data = new Date(this._data.getTime());\n        return data;\n    }\n    paraTexto() {\n        return `\n            Data: ${this.data},\n            Quantidade: ${this.quantidade},\n            Valor: ${this.valor}\n        `;\n    }\n    ehIgual(negociacao) {\n        return this.data.getDate() === negociacao.data.getDate()\n            && this.data.getMonth() === negociacao.data.getMonth()\n            && this.data.getFullYear() === negociacao.data.getFullYear();\n    }\n}\n\n\n//# sourceURL=webpack://alurabank/./app/src/js/models/negociacao.js?")}},__webpack_module_cache__={},inProgress,dataWebpackPrefix;function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var a=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](a,a.exports,__webpack_require__),a.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.d=(e,n)=>{for(var a in n)__webpack_require__.o(n,a)&&!__webpack_require__.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})},__webpack_require__.f={},__webpack_require__.e=e=>Promise.all(Object.keys(__webpack_require__.f).reduce(((n,a)=>(__webpack_require__.f[a](e,n),n)),[])),__webpack_require__.u=e=>e+".bundle.js",__webpack_require__.miniCssF=e=>{},__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),inProgress={},dataWebpackPrefix="alurabank:",__webpack_require__.l=(e,n,a,o)=>{if(inProgress[e])inProgress[e].push(n);else{var r,t;if(void 0!==a)for(var i=document.getElementsByTagName("script"),c=0;c<i.length;c++){var s=i[c];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==dataWebpackPrefix+a){r=s;break}}r||(t=!0,(r=document.createElement("script")).charset="utf-8",r.timeout=120,__webpack_require__.nc&&r.setAttribute("nonce",__webpack_require__.nc),r.setAttribute("data-webpack",dataWebpackPrefix+a),r.src=e),inProgress[e]=[n];var _=(n,a)=>{r.onerror=r.onload=null,clearTimeout(p);var o=inProgress[e];if(delete inProgress[e],r.parentNode&&r.parentNode.removeChild(r),o&&o.forEach((e=>e(a))),n)return n(a)},p=setTimeout(_.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=_.bind(null,r.onerror),r.onload=_.bind(null,r.onload),t&&document.head.appendChild(r)}},__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var n=__webpack_require__.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var a=n.getElementsByTagName("script");a.length&&(e=a[a.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),(()=>{var e={main:0};__webpack_require__.f.j=(n,a)=>{var o=__webpack_require__.o(e,n)?e[n]:void 0;if(0!==o)if(o)a.push(o[2]);else{var r=new Promise(((a,r)=>o=e[n]=[a,r]));a.push(o[2]=r);var t=__webpack_require__.p+__webpack_require__.u(n),i=new Error;__webpack_require__.l(t,(a=>{if(__webpack_require__.o(e,n)&&(0!==(o=e[n])&&(e[n]=void 0),o)){var r=a&&("load"===a.type?"missing":a.type),t=a&&a.target&&a.target.src;i.message="Loading chunk "+n+" failed.\n("+r+": "+t+")",i.name="ChunkLoadError",i.type=r,i.request=t,o[1](i)}}),"chunk-"+n,n)}};var n=(n,a)=>{var o,r,[t,i,c]=a,s=0;for(o in i)__webpack_require__.o(i,o)&&(__webpack_require__.m[o]=i[o]);for(c&&c(__webpack_require__),n&&n(a);s<t.length;s++)r=t[s],__webpack_require__.o(e,r)&&e[r]&&e[r][0](),e[t[s]]=0},a=self.webpackChunkalurabank=self.webpackChunkalurabank||[];a.forEach(n.bind(null,0)),a.push=n.bind(null,a.push.bind(a))})();var __webpack_exports__=__webpack_require__("./app/src/js/app.js")})();