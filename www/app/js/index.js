
  document.querySelector('.search').onclick = function() {
    var ms = document.querySelector('#modal-search');
    ms.style.display= 'block';
    var hides = document.querySelector('.search');
    hides.style.visibility = "hidden";
  };

  document.querySelector('#close').onclick = function() {
    var ms = document.querySelector('#modal-search');
    ms.style.display= 'none';
    var es = document.querySelector('.search');
    es.style.visibility = ' visible';
  };
