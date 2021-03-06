var $ = function (query) { return document.querySelector(query); };
var isMobile = (function (a) { return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))); })(navigator.userAgent || navigator.vendor || window.opera);
if (isMobile) {
    document.documentElement.setAttribute('mobile', 'true');
}
else {
    document.documentElement.setAttribute('mobile', 'false');
}
var generateGraphLayout = function (params) {
    if (params === void 0) { params = {
        xaxisScale: 'linear',
        yaxisScale: 'linear'
    }; }
    var graphlayout = {
        title: {
            text: params.title,
            font: {
                color: '#fff',
                family: 'Montserrat',
                size: 32
            }
        },
        xaxis: {
            title: {
                text: params.xaxisLabel
            },
            color: '#fff',
            fixedrange: isMobile ? true : false,
            type: params.xaxisScale
        },
        yaxis: {
            title: {
                text: params.yaxisLabel
            },
            color: '#fff',
            fixedrange: isMobile ? true : false,
            type: params.yaxisScale
        },
        plot_bgcolor: '#333',
        paper_bgcolor: '#333',
        dragmode: isMobile ? false : 'zoom',
        hovermode: isMobile ? 'closest' : 'x',
        margin: {
            l: 40,
            r: 40,
            t: 80,
            b: 80
        }
    };
    return graphlayout;
};
var graphOptions = {
    responsive: true
};
var getIndicesOf = function (str, patt) {
    var indices = [];
    var removedChars = 0;
    var resStart = patt.exec(str);
    function f(res) {
        if (res != null) {
            indices.push(removedChars + res.index);
            removedChars += res.index + 1;
            res = patt.exec(str.slice(removedChars));
            f(res); // Iterate
        }
    }
    f(resStart);
    return indices;
};
var El = {
    create: function (queryIn, inner, attributes) {
        if (queryIn === void 0) { queryIn = ''; }
        if (inner === void 0) { inner = ''; }
        if (attributes === void 0) { attributes = {}; }
        // Split query
        var indices = getIndicesOf(queryIn, /[.#]/);
        var query = [];
        query.push(queryIn.substring(0, indices[0])); // First
        for (var i = 1; i < indices.length; i++) {
            query.push(queryIn.substring(indices[i - 1], indices[i])); // Middles
        }
        query.push(queryIn.substring(indices[indices.length - 1], queryIn.length)); // Last
        if (query[0] == '') {
            query[0] = 'div'; // Set to div if empty
        }
        // Add classes & id
        var el = document.createElement(query[0]);
        for (var i = 1; i < query.length; i++) {
            if (query[i].charAt(0) == '.') {
                // Add class
                el.classList.add(query[i].slice(1));
            }
            else if (query[i].charAt(0) == '#') {
                // Add ID
                el.id = query[i].slice(1);
            }
        }
        // Add inner
        if (Array.isArray(inner)) {
            el.append.apply(el, inner);
        }
        else {
            el.append(inner);
        }
        // Add attributes
        for (var attr in attributes) {
            if (attr.startsWith('on')) {
                el[attr] = attributes[attr];
            }
            else {
                el.setAttribute(attr, attributes[attr].toString());
            }
        }
        return el;
    }
};
var formatNum = function (num) { return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); };
// Get data
var data;
var request = new XMLHttpRequest();
request.open('GET', 'https://pomber.github.io/covid19/timeseries.json');
request.send();
request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
        // Parse data
        data = JSON.parse(request.responseText);
        // Worldwide data
        var worldwideCases = [];
        // Excluding China
        var casesExcludingChina = [];
        for (var day in data['China']) {
            var currentDayWorldwideData = {
                date: data['China'][day].date,
                confirmed: 0,
                deaths: 0,
                recovered: 0
            };
            var currentDayExcludingChinaData = {
                date: data['China'][day].date,
                confirmed: 0,
                deaths: 0,
                recovered: 0
            };
            // Calculate Worldwide data
            for (var country in data) {
                currentDayWorldwideData.confirmed += data[country][day].confirmed;
                currentDayWorldwideData.deaths += data[country][day].deaths;
                currentDayWorldwideData.recovered += data[country][day].recovered;
            }
            // Calculate data excluding China
            currentDayExcludingChinaData.confirmed = currentDayWorldwideData.confirmed - data['China'][day].confirmed;
            currentDayExcludingChinaData.deaths = currentDayWorldwideData.deaths - data['China'][day].deaths;
            currentDayExcludingChinaData.recovered = currentDayWorldwideData.recovered - data['China'][day].recovered;
            worldwideCases.push(currentDayWorldwideData);
            casesExcludingChina.push(currentDayExcludingChinaData);
        }
        data['Worldwide'] = worldwideCases;
        data['Excluding China'] = casesExcludingChina;
        // Emit data load event
        window.onDataLoad(data);
    }
};
window.onload = function () {
    var searchBoxes = document.querySelectorAll('.search');
    var _loop_1 = function (i) {
        var sb = searchBoxes[i];
        // Dropdown
        sb.querySelector('input').onfocus = function () {
            sb.querySelector('ul.dropdown').classList.add('visible');
            sb.querySelector('.arrow').classList.add('down');
        };
        var inputBlur = function () {
            sb.querySelector('input').blur();
            sb.querySelector('ul.dropdown').classList.remove('visible');
            sb.querySelector('.arrow').classList.remove('down');
        };
        sb.querySelector('input').onblur = inputBlur;
        var unfocussable = sb.querySelectorAll('.arrow');
        for (var i_1 = 0; i_1 < unfocussable.length; i_1++) {
            unfocussable[i_1].addEventListener('mouseover', function () {
                sb.querySelector('input').onblur = null;
            });
            unfocussable[i_1].addEventListener('mouseleave', function () {
                sb.querySelector('input').onblur = inputBlur;
            });
        }
        sb.querySelector('.arrow').addEventListener('click', function () {
            if (sb.querySelector('ul.dropdown').classList.contains('visible')) {
                inputBlur();
            }
            else {
                sb.querySelector('input').focus();
            }
        });
        // Search
        sb.querySelector('input').oninput = function () {
            var lis = sb.querySelectorAll('ul.dropdown > li');
            var value = sb.querySelector('input').value.toLowerCase();
            unselectLi(lis);
            for (var i_2 = 0; i_2 < lis.length; i_2++) {
                var li = lis[i_2];
                if (!li.innerText.toLowerCase().includes(value)) {
                    li.style.display = 'none';
                }
                else {
                    li.style.display = 'block';
                }
            }
        };
        // Handle key input
        var selectedIndex = -1;
        var selectLi = function (lis, index) {
            if (selectedIndex != -1) {
                lis[selectedIndex].classList.remove('selected');
            }
            selectedIndex = index;
            lis[selectedIndex].classList.add('selected');
            var dropdown = $('.dropdown');
            var selectedEl = $('li.selected');
            if ((dropdown.offsetHeight - selectedEl.offsetHeight) - (selectedEl.offsetTop - dropdown.scrollTop) < 0) {
                // Scroll down to the element
                dropdown.scrollTop = selectedEl.offsetTop + selectedEl.offsetHeight - dropdown.offsetHeight;
            }
            else if ((selectedEl.offsetTop - dropdown.scrollTop) < 0) {
                // Scroll up to the element
                dropdown.scrollTop = selectedEl.offsetTop;
            }
        };
        var unselectLi = function (lis) {
            if (selectedIndex != -1) {
                lis[selectedIndex].classList.remove('selected');
            }
            selectedIndex = -1;
        };
        sb.querySelector('input').addEventListener('keydown', function (e) {
            var lis = sb.querySelectorAll('ul.dropdown > li');
            // console.log(e)
            if (e.code == 'Enter') {
                if (selectedIndex == -1) {
                    for (var i_3 = 0; i_3 < lis.length; i_3++) {
                        if (lis[i_3].style.display != 'none') {
                            lis[i_3].click();
                            inputBlur();
                            unselectLi(lis);
                            break;
                        }
                    }
                }
                else {
                    lis[selectedIndex].click();
                    inputBlur();
                    unselectLi(lis);
                }
            }
            if (e.code == 'ArrowDown') {
                e.preventDefault();
                if (selectedIndex == -1) {
                    for (var i_4 = 0; i_4 < lis.length; i_4++) {
                        if (lis[i_4].style.display != 'none') {
                            selectLi(lis, i_4);
                            break;
                        }
                    }
                }
                else {
                    for (var i_5 = selectedIndex + 1; i_5 < lis.length; i_5++) {
                        if (lis[i_5].style.display != 'none') {
                            selectLi(lis, i_5);
                            break;
                        }
                    }
                }
            }
            if (e.code == 'ArrowUp') {
                e.preventDefault();
                if (selectedIndex == -1) {
                    for (var i_6 = lis.length - 1; i_6 > -1; i_6--) {
                        if (lis[i_6].style.display != 'none') {
                            selectLi(lis, i_6);
                            break;
                        }
                    }
                }
                else {
                    for (var i_7 = selectedIndex - 1; i_7 > -1; i_7--) {
                        if (lis[i_7].style.display != 'none') {
                            selectLi(lis, i_7);
                            break;
                        }
                    }
                }
            }
        });
    };
    for (var i = 0; i < searchBoxes.length; i++) {
        _loop_1(i);
    }
};
var toggleLog = function (button) {
    var graphEl = button.parentElement;
    if (graphEl.classList.contains('log')) {
        graphEl.classList.remove('log');
        Plotly.update(graphEl, {}, {
            yaxis: {
                color: '#fff',
                fixedrange: isMobile ? true : false,
                type: 'linear'
            }
        });
    }
    else {
        graphEl.classList.add('log');
        Plotly.update(graphEl, {}, {
            yaxis: {
                color: '#fff',
                fixedrange: isMobile ? true : false,
                type: 'log'
            }
        });
    }
};
