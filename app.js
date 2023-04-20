const doc   = document,
      log   = (...key)=> { console.log(key) },
      dce   = (x)=> doc.createElement(x),
      qu    = (x)=> doc.querySelector(x),
      quAll = (x)=> doc.querySelectorAll(x);
      int   = (x)=> (isNaN(x) ) ? 0 : parseInt(x),
      float = (x)=> (isNaN(x) ) ? 0 : parseFloat(x),
      bool  = (x)=> (x == 'false') ? Boolean(0) : Boolean(x),
      str   = (x)=> (x).toString(),
      round = (x, dec)=>  parseFloat(x.toFixed(dec)),
      factorial =(n)=> (n <= 1) ? n : (n *= factorial(n-1)),
      coinTose = (bias)=> (Math.random() > bias) ? true : false,
      randRange = (bias)=> (coinTose(bias)) ? Math.random() * -1 : Math.random(),
      dbz   = (x, y)=> (y == 0) ? 0 : (x / y) ;  //HANDLE DIVISION BY ZERO
      queryNot = (q)=>(n)=> quAll(`${q}:not(${n})`),  //SPECIAL not query
      escapeHTML =(str)=> new Option(str).innerHTML,
      escapeRegexToRegex = (str)=> (str.search(/\W/) > -1) ? new RegExp(str.split('').map( x=> (x.search(/\W/) > -1 && x != ' ') ? (`\\`+x) : x ).join(''), 'g' ) : str,            //str.search(/\?|\=|\[|\]|\}|\{|\.|\,|\^|\*|\!|\$|\(|\)|\-|\/|\>|\<|\'|\"|\`/g)
      escapeRegex = (str)=> (str.search(/\W/) > -1) ? str.split('').map( x=> (x.search(/\W/) > -1 && x != ' ') ? (`\\`+x) : x ).join('') : str,
      getMethods = (x) => Object.getOwnPropertyNames(x.__proto__),
      bigger = (a)=> (b)=> (a < b) ? b : a,
      OR = (a)=> (b)=> (a < 0) ? b : (a || b),  //compares if a is negative return other value , in all other bahave as usual
      appendAll = (papa, A) => A.forEach( x=> papa.appendChild(x) ),
      chain = (x) => (x)=> (x),  //chain multiple actions
      show_this = (it, mechanism)=> (mechanism) ? it.style.display = mechanism || 'block' : it.style.display = 'none',
      isIterable= (obj)=> (obj != null) && typeof obj[Symbol.iterator] === 'function',
      unpack = (str, rule)=> (isIterable(str)) ? [...str.toString().split(rule)] : '',
      getAllProperties = (thing, props = [] ) => thing.__proto__ ? getAllProperties(thing.__proto__, props.concat( Object.getOwnPropertyNames(thing)) ) : [...new Set(props.concat(  Object.getOwnPropertyNames(thing) ))];


const $$ = {
  vars  : {
    zoom_val : 1,
    CELL : null,
    DATA : ``,
    HOLD_START : 0,
  },
  query : {},
  collectQuery : function(){
          $$.query = {
                //ELEMENTS
                container    : qu('.container'),
                bigContainer : qu('.big-container'),
                top     : qu('.top'),
                mid     : qu('.mid'),
                bottom  : qu('.bottom'),
                restovi : qu('.restovi'),
                tableContainer : qu('.table-container'),
                cellText : qu('[name="cell-text"]'),
             }
  },
  collectData : function(){
        let trs = qu('.bee-control-table').querySelectorAll('tr'),                     //cells = quAll('.cell'),
            txt = ``;
        for(let i = 0; i < trs.length; i++){
          let cells = trs[i].children;
          for(let j = 0;j< cells.length;j++){
              let data = cells[j].getAttribute('data') || '';
                  data = $$.escapeNewLine(data);              //    data.replaceAll('\n', ' ');
              if(cells[j].classList.contains('hive') && (data == null || data == '') ) data = 'K';
              txt += (data+',');
          }
          txt += '\n'; //END OF lines add new line
        }
        $$.vars.DATA = txt;
  },
  saveStorage : ()=> {
        if(localStorage.getItem('pcelar') === $$.vars.DATA) return false; //DONT SAVE SAME DATA
        localStorage.setItem('pcelar', $$.vars.DATA);
        $$.popover('Sačuvano...');
  },
  checkStorage : function(){
        if(localStorage.getItem('pcelar') != null){
           $$.vars.DATA = localStorage.getItem('pcelar');
           $$.fillData();
         }
  },
  fillData : function(){
        qu('.bee-control-table').querySelector('tbody').innerHTML = '';
        let data = $$.vars.DATA;
        let lines = data.split('\n');

        for(let i = 0;i< lines.length-1;i++){
          let tr = dce('TR');
          let cells = lines[i].split(',');
          for(let j = 0; j<cells.length-1;j++){
            let td = dce('TD');
                td.classList.add('cell');
                $$.addCellEvent(td);
                switch(cells[j]){
                    default:  td.setAttribute('data', cells[j] ); td.classList.add('hive'); break;
                    case 'K': td.classList.add('hive'); break;
                    case '':  break;
                }
               tr.appendChild(td);
               qu('.bee-control-table').querySelector('tbody').appendChild(tr);
          }
        }
  },
  findPosition : function(me){
     let trs = qu('.bee-control-table').querySelectorAll('tr');
     for(let i = 0;i< trs.length;i++){
         let cells = trs[i].children;
         for(let j = 0;j< cells.length;j++){
           if(cells[j] == me) return [i, j];
         }
     }
  },
  addRow : function(){
       let tr = dce('TR');
       let table = qu('.bee-control-table');
       let ammount;
           (table.querySelector('tr') ==  null) ? ammount = 20
                                                : ammount = table.querySelectorAll('tr')[0].children.length;   //RANDOM CHOICE, in any case it must be same for all
       for(let i = 0;i<ammount;i++){
           let td = dce('TD');
               td.classList.add('cell');
               $$.addCellEvent(td);
           tr.appendChild(td);
       }
       return tr;
  },
  addColumn : function(){
       let trs = qu('.bee-control-table').querySelectorAll('tr');
       for(let i = 0;i<trs.length;i++){
           let td = dce('TD');
           td.classList.add('cell');
           $$.addCellEvent(td);
           trs[i].appendChild(td);
       }
  },
  removeRow : function(){
       let trs = qu('.bee-control-table').querySelectorAll('tr');
           trs[trs.length-1].remove();
  },
  removeColumn : function(){
       let trs = qu('.bee-control-table').querySelectorAll('tr');
       for(let i = 0;i<trs.length;i++){
           trs[i].children[trs[i].children.length-1].remove();
       }
  },
  createMapControls : function(){
      let zoomIn = dce('input');
      let zoomOut = dce('input');
      let rotate = dce('input');
      let AddRow = dce('input');
      let AddColumn = dce('input')
      let RemoveRow = dce('input');
      let RemoveColumn = dce('input')

      zoomIn.type = 'button';
      zoomOut.type = 'button';
      rotate.type = 'button';

      AddRow.type = 'button';
      AddColumn.type = 'button';
      RemoveRow.type = 'button';
      RemoveColumn.type = 'button';

      zoomIn.classList.add('--button');
      zoomOut.classList.add('--button');
      rotate.classList.add('--button');

      AddRow.classList.add('--button');
      AddColumn.classList.add('--button');
      RemoveRow.classList.add('--button');
      RemoveColumn.classList.add('--button');

      zoomIn.value = 'Z+';
      zoomOut.value = 'Z-';
      rotate.value = "↺";

      AddRow.value = "+r";
      AddColumn.value = "+k";
      RemoveRow.value = "-r";
      RemoveColumn.value = "-k";

      let tableContainer = qu('.table-container');
      let table = qu('.bee-control-table');

      let minLimit = 0.5;
      let maxLimit = 5;
      let inc = 0.1;
      let rotation = table.getAttribute('rot');  //OLD ROTATION
      //ZOOM FUNCTIONALITY
      zoomIn.addEventListener('click', e=>  {
          ($$.vars.zoom_val < maxLimit) ? $$.vars.zoom_val += inc : $$.vars.zoom_val = $$.vars.zoom_val;
          table.style.transform = `scale(${$$.vars.zoom_val}) rotate(${rotation}deg)`;
      });
      zoomOut.addEventListener('click', e=>  {
          ($$.vars.zoom_val > minLimit) ? $$.vars.zoom_val -= inc : $$.vars.zoom_val = $$.vars.zoom_val ;
          table.style.transform = `scale(${$$.vars.zoom_val}) rotate(${rotation}deg)`;
      });

      rotate.addEventListener('click', e=>{
          ( parseInt(table.getAttribute('rot')) == 0 ) ? rotation = -90 : rotation = 0;
          table.setAttribute('rot', rotation);
          table.style.transform = `scale(${$$.vars.zoom_val}) rotate(${rotation}deg)`;
      });

     AddRow.addEventListener('click', e=>{
           let tr = $$.addRow();
           table.appendChild(tr);
     });
     AddColumn.addEventListener('click', $$.addColumn );
     RemoveRow.addEventListener('click', $$.removeRow    );
     RemoveColumn.addEventListener('click', $$.removeColumn );

      let div = dce('DIV');
          div.classList.add('zoom-div');
      let divider = dce('span');
          divider.classList.add('divider');
      div.appendChild(zoomIn);
      div.appendChild(zoomOut);
      div.appendChild(rotate);

      div.appendChild(divider);

      div.appendChild(AddRow);
      div.appendChild(AddColumn);
      div.appendChild(RemoveRow);
      div.appendChild(RemoveColumn);


      zoomIn.title = "ZUMIRAJ";
      zoomOut.title = "ODZUMIRAJ";
      rotate.title = "ROTIRAJ";
      AddRow.title = "DODAJ RED";
      AddColumn.title = "DODAJ KOLONU";
      RemoveRow.title = "UKLONI RED";
      RemoveColumn.title = "UKLONI KOLONU";

      tableContainer.appendChild(div);
  },
  createSearch : function(){
       let div = dce('div');
           div.classList.add('search-div');
       let input = dce('input');
           input.type = 'text';
           input.placeholder = 'Pretraži...';
       let tableContainer = qu('.table-container');
       let table = qu('.bee-control-table');


           input.addEventListener('keyup', e=>{
             let hives = quAll('.hive');

             for(let i = 0;i< hives.length;i++){
               let data = hives[i].getAttribute('data');
               if(input.value.length < 1 ) { hives[i].style.outline = ''; continue; }

               if( data != null && data.search(input.value) > -1) hives[i].style.outline = '2px solid var(--macRed)';
               else                                               hives[i].style.outline = '';
             }
           });

        div.appendChild(input);

        tableContainer.insertBefore(div, table );

  },
  addCellEvent : function(cell){
      cell.addEventListener('click', e=>{
        let target = e.target;

        switch(target.classList[1] == 'hive'){
          case false:
                     target.classList.add('hive');
          break;
          case true:
                    $$.vars.CELL = e.target;
                    $$.cellMenu(e);
          break;
        }

      });

  },
  createTable : function(rows, columns){
        let table = dce('TABLE');
        let thead = dce('thead');
        let tbody = dce('tbody');
        let tfoot = dce('tfoot');

        table.classList.add('bee-control-table');
        table.setAttribute('rot', 0);

        table.appendChild(thead);
        table.appendChild(tbody);

        for(let i = 0; i < rows; i++){
            let tr = dce('TR');
                tr.classList.add('table-row');
          for(let j = 0; j < columns; j++){
             let td = dce('TD');
                 td.innerText = '';
                 td.classList.add('cell');
                 $$.addCellEvent(td);

               tr.appendChild(td);
          }
          tbody.appendChild(tr);
        }
        table.appendChild(tfoot);

        qu('.table-container').appendChild(table);
  },
  showSpecificContainer : function(that){
         let container = qu('.container');
         if(that == null) { //RESET to HOME SCREEN
            show_this( qu('.table-container'), 'none');
            show_this( qu('.settings-container'), 'none');
            show_this( qu('.help-container'), 'none');
            show_this( qu('.diary-container'), 'none');
            return show_this(container, 'block');
         }
         if( that.style.display == 'block') { show_this(that, 'none');  show_this(container, 'block'); }
         else                               { show_this(that, 'block'); show_this(container, 'none');  }
  },

  countCells : function(){
       let hives = quAll('.hive');
       return qu('.mid-circle').innerText = hives.length;
  },

  readBackData : (data)=> data.replaceAll('&#10;', '\n'),
  escapeNewLine : (data)=> data.replaceAll('\n', '&#10;'),

  cellMenu : function(e){
      let cellMenu = qu('.cell-menu');
      show_this(cellMenu, 'block');
      let rect = e.target.getBoundingClientRect();
      cellMenu.style.left = rect.left-5 + 'px';
      cellMenu.style.top  = rect.top-35 + 'px';

      if($$.vars.CELL && $$.vars.CELL.getAttribute('data') != null){
          show_this( qu('.cell-data'), 'block' );
          $$.query.cellText.value = $$.readBackData( $$.vars.CELL.getAttribute('data') );
      }else{
          show_this( qu('.cell-data'), 'none' );
      }

  },
  createHelpTable : function(){
         let hc =  qu('.help-container');
         let help_table = dce('table');
         let ok = Object.keys(HELP);
         let ov = Object.values(HELP);
         for(let i = 0; i < ok.length; i++){
             let tr = dce('tr');
             let td1 = dce('td');
                 td1.innerText =  ok[i];
             let td2 = dce('td');
                 td2.innerText = ov[i];
                 tr.appendChild(td1);
                 tr.appendChild(td2);
                 help_table.appendChild(tr);
          }

          hc.appendChild(help_table);
  },
  fillDiaryTable : function(){
         let diary_table = qu('.diary-table').querySelector('tbody');
         let allCells = quAll('.hive');

         diary_table.innerHTML = '';  //RESET OLD

         //FILL NEW DATA if any
         if(allCells.length < 1) return false;

         for(let i = 0; i < allCells.length; i++){
             let tr = dce('tr');
             let td1 = dce('td');
                 td1.innerText = i+1;
             let td2 = dce('td');
                 td2.innerText =  $$.readBackData( allCells[i].getAttribute('data') );
                 let pos_arr = $$.findPosition(allCells[i]);
             let td3 = dce('td');
                 if(pos_arr != null) td3.innerText = `Red:${pos_arr[0]+1 || 0} Kolona:${pos_arr[1]+1 || 0}`;
                 tr.appendChild(td1);
                 tr.appendChild(td2);
                 tr.appendChild(td3);
                 diary_table.appendChild(tr);
          }
  },
  //# DOWNLOAD AS .CSV TEXT
  downloader : function(type, content){
                  const A = dce('a');
                  const file = new Blob([content], {type: type});
                  A.href = URL.createObjectURL(file);

                  A.download = 'pcelar-export';
                  A.hidden = true;
                  A.id = 'linker';
                  qu('.restovi').appendChild(A);
            setTimeout( t=>{  A.click(); A.remove(); }, 0.25 * 1000); //AFTER CLICK REMOVE
  },
  //LOAD .CSV/TEXT
  loadFile : async function(){
          let file = qu('#readFile');
              file.click();

          file.onchange = async function(){
               //ALL GOOD NOW CREATE NEW IMAGE ON SCREEN
               let newFile = file.files[0];
               let reader = new FileReader();

               if(newFile) reader.readAsText(newFile);
                //APPEND
                await reader.addEventListener('load', async ()=>{
                    let _type= newFile.name;
                    $$.vars.DATA = reader.result;
                    await $$.fillData();
                    // await log(reader.result);
                   file.value = ""; //CLEAN AFTER YOURSELF
                });
             }
  },

  popover : (newContent, disappear)=>  {
      if(document.getElementById("pop") != null) document.getElementById("pop").remove();  //ONLY ONCE pop AT THE TIME remove old
      let doc = document;
      let pop = doc.createElement('DIV');
      pop.id = 'pop';
      disappear = disappear || 4130; //can be not set it will use default value

      //DEFINE INNER CONTENT OF POP DIV
      pop.innerHTML = newContent;
      doc.body.appendChild(pop); //ADD POP TO DOCUMENT

      let hide = () => {pop.style.opacity = '0'}

      setTimeout(hide, disappear) //FADE OUT EFFECT
      setTimeout( t=> pop.remove(), disappear + 300) //REMOVE OLD POP
  },




}


const main = function(){
      $$.collectQuery();
      $$.createTable(1, 2);
      $$.createMapControls();
      $$.createHelpTable();
      $$.checkStorage();
      $$.countCells();
      $$.createSearch();

      qu('.mid-circle').addEventListener('click', e=>  $$.showSpecificContainer( qu('.table-container') ) );
      qu('.triangle').addEventListener('click', e=>  $$.showSpecificContainer( qu('.settings-container') ) );
      qu('.manual').addEventListener('click', e=>  $$.showSpecificContainer( qu('.help-container') ) );
      qu('.diary').addEventListener('click', e=>  {
         $$.showSpecificContainer( qu('.diary-container') );
         $$.fillDiaryTable();
      });
     //GO BACK
      qu('.back').addEventListener('click', e=> {
          $$.showSpecificContainer( null );
          $$.countCells();
          show_this(qu('.cell-menu'), 'none');
          $$.collectData();
          $$.saveStorage();
      });

     //REFRESH BY HOLD (2-STEP-PROCESS)
      qu('.back').addEventListener('mousedown', e=> $$.vars.HOLD_START = Date.now() );
      qu('.back').addEventListener('mouseup', e=> {
         let d = Date.now();
         let delta = d - $$.vars.HOLD_START;
         if(delta /1000 > 3) location.reload();
      });
     //DELETE CELL
      qu('.delete-cell').addEventListener('click', e=> {
          $$.vars.CELL.classList.remove('hive');
          $$.vars.CELL.setAttribute('data', '');
          $$.vars.CELL = null;
          show_this( qu('.cell-data'), 'none' );
          show_this( qu('.cell-menu'), 'none' );
      });
     //EDIT CELL
      qu('.edit-cell').addEventListener('click', e=> {
          show_this( qu('.cell-data'), 'block' );
          $$.query.cellText.value = ''; //RESET OLD
      });
     //INPUTED TEXT IS AUTO ATTACHED TO CELL DATA
      $$.query.cellText.addEventListener('keyup', e=> $$.vars.CELL.setAttribute('data', e.target.value) );
     //EXPORT
      qu('.export').addEventListener('click', e=>{
          if($$.vars.DATA == null) { alert('NEMAM PODATKE...'); return false; }
          $$.downloader('text/csv', $$.vars.DATA);
      });
     //IMPORT
      qu('.import').addEventListener('click', $$.loadFile );

      window.addEventListener('click', e=>{
          if(e.target.classList[0] != 'cell' &&
             e.target.name != 'cell-text' &&
             e.target.classList[0] != 'cell-data' &&
             e.target.classList[0] != 'edit-cell') {
               show_this(qu('.cell-data'), 'none');
               show_this(qu('.cell-menu'), 'none');
          }
      });
}

main();
