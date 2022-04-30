(this['webpackJsonpaltv-basic'] = this['webpackJsonpaltv-basic'] || []).push([
    [0],
    {
        20: function (n, t, e) {
            'use strict';
            e.r(t);
            var i,
                o,
                a,
                s,
                c,
                r,
                h,
                d = e(0),
                l = e.n(d),
                b = e(9),
                g = e.n(b),
                v = e(7),
                j = e(2),
                p = e(3),
                f =
                    (p.b.div(
                        i ||
                            (i = Object(j.a)([
                                '\n    width: 100vw;\n    height: 100vh;\n',
                            ]))
                    ),
                    p.b.div(
                        o ||
                            (o = Object(j.a)([
                                '\n    z-index: 5;\n    color: #000;\n    width: 15%;\n    position: fixed;\n    bottom: 12.65%;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n',
                            ]))
                    )),
                w = p.b.div(
                    a ||
                        (a = Object(j.a)([
                            '\n    width: 100%;\n    height: 4vh;\n    line-height: 4vh;\n    text-align: center;\n    position: absolute;\n    display: inline-block;\n    white-space: nowrap;\n',
                        ]))
                ),
                u = p.b.div(
                    s ||
                        (s = Object(j.a)([
                            '\n    font-size: 1.3vh;\n    line-height: 4vh;\n    position: relative;\n    color: #ffffff;\n    z-index: 10;\n    font-weight: bold;\n',
                        ]))
                ),
                O = p.b.div(
                    c ||
                        (c = Object(j.a)([
                            '\n    width: 100%;\n    height: 4vh;\n    background: rgba(0, 0, 0, 0.246);\n    text-align: left;\n    overflow: hidden;\n    position: relative;\n    display: block;\n    white-space: nowrap;\n    border-radius: 2px;\n',
                        ]))
                ),
                x = p.b.div(
                    r ||
                        (r = Object(j.a)([
                            '\n    background-color: #FFC130 !important;\n    width: 0%;\n    height: 4vh;\n    transition: width 0.3s;\n    transition-timing-function: ease-out;\n',
                        ]))
                ),
                m = e(1),
                y = function () {
                    var n = Object(d.useState)('Desconhecido'),
                        t = Object(v.a)(n, 2),
                        e = t[0],
                        i = t[1],
                        o = Object(d.useState)('0'),
                        a = Object(v.a)(o, 2),
                        s = a[0],
                        c = a[1];
                    return (
                        Object(d.useEffect)(function () {
                            var n = void 0;
                            'alt' in window &&
                                (alt.emit('ready'),
                                alt.on('progressBar:start', function (t) {
                                    var e =
                                        arguments.length > 1 &&
                                        void 0 !== arguments[1]
                                            ? arguments[1]
                                            : 5e3;
                                    console.log('test', t, e);
                                    var o = 0;
                                    i(t),
                                        (n = setInterval(function () {
                                            c(
                                                ''.concat(
                                                    ((1e3 / e) * (o += 10)) / 10
                                                )
                                            ),
                                                o >= e &&
                                                    n &&
                                                    (c(''.concat(0)),
                                                    clearInterval(n),
                                                    'alt' in window &&
                                                        alt.emit(
                                                            'progressBar:finished'
                                                        ),
                                                    (n = void 0));
                                        }, 10));
                                }));
                        }, []),
                        Object(m.jsxs)(f, {
                            children: [
                                Object(m.jsx)(w, {
                                    children: Object(m.jsx)(u, { children: e }),
                                }),
                                Object(m.jsx)(O, {
                                    children: Object(m.jsx)(x, {
                                        style: { width: ''.concat(s, '%') },
                                    }),
                                }),
                            ],
                        })
                    );
                },
                k = Object(p.a)(
                    h ||
                        (h = Object(j.a)([
                            "\n@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');\n  * {\n    margin: 0;\n    padding: 0;\n    outline: 0;\n    box-sizing: border-box;\n  }\n  body {\n    width: 100vw;\n    height: 100vh;\n    font-family: 'Poppins', sans-serif;\n    -webkit-font-smoothing: antialiased;\n    user-select: none;\n  }\n  #root{\n    width: 100%;\n    height: 100%;\n  }\n  a {\n    text-decoration: none;\n  }\n",
                        ]))
                );
            g.a.render(
                Object(m.jsxs)(l.a.StrictMode, {
                    children: [Object(m.jsx)(y, {}), Object(m.jsx)(k, {})],
                }),
                document.getElementById('root')
            );
        },
    },
    [[20, 1, 2]],
]);
//# sourceMappingURL=main.0a9bf840.chunk.js.map
