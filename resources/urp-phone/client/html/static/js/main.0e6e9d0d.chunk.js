(this['webpackJsonpaltv-basic'] = this['webpackJsonpaltv-basic'] || []).push([
    [0],
    {
        15: function (e, t, c) {
            'use strict';
            c.r(t), (t.default = c.p + 'static/media/walpaper.04f956eb.jpg');
        },
        65: function (e, t, c) {},
        66: function (e, t, c) {},
        73: function (e, t, c) {
            'use strict';
            c.r(t);
            var n = c(1),
                a = c.n(n),
                s = c(11),
                i = c.n(s),
                o = (c(65), c(3)),
                r = (c(66), c.p + 'static/media/call.5fa04bf1.png'),
                l = c.p + 'static/media/contacts.4b1d9045.png',
                d = c.p + 'static/media/messages.a425e1c2.png',
                j = c.p + 'static/media/calculator.e98e3762.png',
                b = c(5),
                m = c(0);
            function u(e) {
                var t = e.img,
                    c = e.onclick,
                    n = e.to;
                return 'call' === t
                    ? Object(m.jsxs)(b.b, {
                          to: n,
                          children: [
                              ' ',
                              Object(m.jsx)('div', {
                                  className: 'iconAPP',
                                  style: {
                                      backgroundImage: 'url('.concat(r, ')'),
                                  },
                                  onClick: c,
                              }),
                          ],
                      })
                    : 'contacts' === t
                    ? Object(m.jsx)(b.b, {
                          to: n,
                          children: Object(m.jsx)('div', {
                              className: 'iconAPP',
                              style: { backgroundImage: 'url('.concat(l, ')') },
                              onClick: c,
                          }),
                      })
                    : 'camera' === t
                    ? Object(m.jsx)(b.b, {
                          to: n,
                          children: Object(m.jsx)('div', {
                              className: 'iconAPP',
                              style: { backgroundImage: 'url('.concat(j, ')') },
                              onClick: c,
                          }),
                      })
                    : 'msg' === t
                    ? Object(m.jsx)(b.b, {
                          to: n,
                          children: Object(m.jsx)('div', {
                              className: 'iconAPP',
                              style: { backgroundImage: 'url('.concat(d, ')') },
                              onClick: c,
                          }),
                      })
                    : Object(m.jsx)(m.Fragment, {});
            }
            function h(e) {
                var t = e.name,
                    c = e.w,
                    n = e.h,
                    a = e.ml,
                    s = e.mr;
                if ('menssage' === t)
                    return Object(m.jsx)('div', {
                        style: {
                            backgroundImage: 'url('.concat(d, ')'),
                            width: c,
                            height: n,
                            backgroundSize: '100%',
                            marginLeft: a,
                            marginRight: s,
                        },
                    });
            }
            var x = c(2),
                O = {
                    TimeFormat: function (e) {
                        var t = e,
                            c = Math.floor(t / 3600);
                        t %= 3600;
                        var n = Math.floor(t / 60),
                            a = t % 60;
                        return (
                            (n = String(n).padStart(2, '0')),
                            (c = String(c).padStart(2, '0')),
                            (a = String(a).padStart(2, '0')),
                            n <= 0
                                ? ''.concat(a)
                                : c <= 0
                                ? ''.concat(n, ':').concat(a)
                                : ''.concat(c, ':').concat(n, ':').concat(a)
                        );
                    },
                    useQuery: function () {
                        return new URLSearchParams(Object(x.e)().search);
                    },
                    WhatTime: function (e) {
                        var t = new Date().getTime() - parseInt(e),
                            c = Math.floor(t / 1e3),
                            n = Math.floor(c / 60),
                            a = Math.floor(n / 60);
                        return Math.floor(a / 24) > 0
                            ? a + ' days ago'
                            : a > 0
                            ? a + ' hours ago'
                            : n > 0
                            ? n + ' minutes ago'
                            : c > 0
                            ? c + ' seconds ago'
                            : void 0;
                    },
                    VerifyTxt: function (e) {
                        if (e.length > 1) return e;
                    },
                    FormatStringNumber: function (e) {
                        if ('' !== e && null !== e && void 0 !== e) {
                            var t = e.split(''),
                                c = 0,
                                n = '';
                            return (
                                t.map(function (e) {
                                    3 === ++c || 6 === c
                                        ? (n = n + e + '-')
                                        : (n += e);
                                }),
                                n
                            );
                        }
                    },
                },
                f = c.p + 'static/media/iphone.c4d3c4e3.png',
                p = c.p + 'static/media/chamada.876b287b.mp3',
                g = c.p + 'static/media/chamando.8164bc4f.mp3',
                v = (c.p, c(76));
            function N(e) {
                var t = e.children,
                    c = e.Main,
                    n = e.Desfoc;
                return Object(m.jsx)('div', {
                    className: 'App',
                    children: Object(m.jsx)(v.a.div, {
                        initial: { opacity: 1, y: 550 },
                        animate: { opacity: 1, y: 0 },
                        transition: {
                            y: { type: 'spring', stiffness: 20 },
                            default: { duration: 2 },
                        },
                        children: Object(m.jsxs)('div', {
                            className: 'Phone',
                            children: [
                                Object(m.jsxs)('div', {
                                    className: 'BoxViwer',
                                    style: {
                                        backgroundColor: c.color,
                                        backgroundImage: c.img,
                                        backdropFilter: c.filter,
                                    },
                                    children: [
                                        Object(m.jsx)('div', {
                                            className: 'BoxViwerDesfoc',
                                            style: { display: n },
                                        }),
                                        Object(m.jsxs)('div', {
                                            className: 'Topbar',
                                            children: [
                                                Object(m.jsx)('p', {
                                                    className: 'ml-4',
                                                    children: 'Vivo',
                                                }),
                                                Object(m.jsxs)('p', {
                                                    className: 'mr-3 between',
                                                    children: [
                                                        Object(m.jsx)('i', {
                                                            class: 'fal fa-battery-half',
                                                        }),
                                                        ' ',
                                                        Object(m.jsx)('i', {
                                                            class: 'fal fa-signal-4',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                Object(m.jsx)('img', { src: f, alt: 'png' }),
                                Object(m.jsx)('div', {
                                    className: 'BoxViwerI',
                                    children: t,
                                }),
                            ],
                        }),
                    }),
                });
            }
            var C = !1,
                I = new Audio(p),
                y = new Audio(g);
            function k(e) {
                var t = e.type;
                return (
                    C ||
                        'play' !== t ||
                        ((C = !0), I.play(), (I.volume = 0.1), (I.loop = !0)),
                    C && 'stop' === t && ((C = !1), I.pause()),
                    Object(m.jsx)(m.Fragment, {})
                );
            }
            function F(e) {
                var t = e.type;
                return (
                    C ||
                        'play' !== t ||
                        ((C = !0), y.play(), (y.volume = 0.5), (y.loop = !0)),
                    C && 'stop' === t && ((C = !1), y.pause()),
                    Object(m.jsx)(m.Fragment, {})
                );
            }
            var P,
                w,
                M = [
                    {
                        ssn: '272676-2497',
                        type: 'msg',
                        data: { x: 1, y: 2, z: 5 },
                        menssage: 'Fala ai Andre como voce ta ',
                    },
                    {
                        ssn: '272676-249',
                        type: 'location',
                        data: { x: 1, y: 2, z: 5 },
                        menssage: 'E ai  Dudu eu to suave e vc',
                    },
                    {
                        ssn: '272676-2497',
                        type: 'img',
                        data: { x: 1, y: 2, z: 5 },
                        menssage: 'To bem mano e tu comta indo o servi\xe7o ',
                    },
                    {
                        ssn: '272676-249',
                        type: 'msg',
                        data: { x: 1, y: 2, z: 5 },
                        menssage: 'ta indo bem vou ageitar uma vaga pra vc ',
                    },
                    {
                        ssn: '272676-2497',
                        type: 'msg',
                        data: { x: 1, y: 2, z: 5 },
                        menssage: 'ok agrade\xe7o mano ',
                    },
                    {
                        ssn: '272676-249',
                        type: 'msg',
                        data: '',
                        menssage: 'que isso ',
                    },
                    {
                        ssn: '272676-2497',
                        type: 'msg',
                        data: '',
                        menssage:
                            'Falando nisso viu Gustavinho aquele crime, esta sendo convertido ',
                    },
                    {
                        ssn: '272676-249',
                        type: 'msg',
                        data: '',
                        menssage: 'Ja sabia kkk mui\xe9 ne pai',
                    },
                ],
                S = [
                    {
                        number: '925252',
                        data: { name: 'Eduardo', favorito: !1 },
                    },
                    { number: '922252', data: { name: 'Andre', favorito: !1 } },
                    {
                        number: '932252',
                        data: { name: 'Gustavo', favorito: !0 },
                    },
                    {
                        number: '956252',
                        data: { name: 'Xipanca', favorito: !1 },
                    },
                    { number: '967252', data: { name: 'Allan', favorito: !1 } },
                    { number: '997252', data: { name: 'Nick', favorito: !1 } },
                ],
                V = [],
                T = [
                    { number: '967252', data: '1639669176169' },
                    { number: '997252', data: '1639669176169' },
                    { number: '997252', data: '1639589176169' },
                ],
                B = function (e) {
                    var t = !1,
                        c = '';
                    return (
                        S.map(function (n) {
                            parseInt(n.number) === parseInt(e) &&
                                ((t = !0), (c = n.data.name));
                        }),
                        t || (c = e),
                        c
                    );
                };
            alt.on('Phone:GetAllData', function (e, t, c, n, a) {
                console.log('[PHONE] Loading...'),
                    '' !== e[0].contact &&
                        ((S = JSON.parse(e[0].contact)),
                        console.log('[PHONE] Loading Finish Contact')),
                    '' !== t[0].recent &&
                        ((V = JSON.parse(t[0].recent)),
                        console.log('[PHONE] Loading Finish Recent'),
                        console.log(V)),
                    '' !== c &&
                        ((T = c),
                        console.log('[PHONE] Loading Finish History')),
                    (P = n),
                    console.log('[PHONE] Loading Finish Number'),
                    (w = a),
                    console.log('[PHONE] Loading Finish Ssn');
            });
            var L = {
                    GetMessage: function () {
                        return M;
                    },
                    GetSSN: function () {
                        return w;
                    },
                    CheckAtlV: function () {
                        return void 0 !== window.alt;
                    },
                    GetContact: function () {
                        return S;
                    },
                    SaveContact: function (e) {
                        return (
                            !(function (e) {
                                var t = !1;
                                return (
                                    S.map(function (c) {
                                        c.number === e && (t = !0);
                                    }),
                                    !!t
                                );
                            })(e.number) &&
                            (S.push(e),
                            setTimeout(function () {
                                alt.emit('Phone:UpdateContact', w, S);
                            }, 100),
                            !0)
                        );
                    },
                    CallNumber: function (e) {
                        alt.emit('Phone:CallLink', e);
                    },
                    AceptCall: function (e) {
                        console.log(e),
                            k({ type: 'stop' }),
                            alt.emit('Phone:CallAcept', e);
                    },
                    GetRecents: function () {
                        return V;
                    },
                    VerifyContact: B,
                    DestroyCall: function (e, t, c) {
                        e == P
                            ? alt.emit('Phone:DestroyCallMy', e, t, c)
                            : alt.emit('Phone:DestroyCall', e);
                    },
                    MyNumber: function () {
                        return P;
                    },
                    CreateMessage: function (e, t, c, n) {
                        alt.emit('Phone:CreateMessage', e, t, c, n),
                            alt.emit('Phone:updatecontain', n),
                            T.push({
                                id: c,
                                id_player_one: P,
                                id_player_two: n,
                                contain_message: 1,
                            });
                    },
                    GetHistory: function () {
                        return T;
                    },
                    GetChatId: function (e) {
                        alt.emit('Phone:GetChatMessage', e);
                    },
                    WhatPhone: function (e) {
                        var t = '';
                        return (
                            T.map(function (c) {
                                c.id === e &&
                                    (parseInt(c.id_player_one) === parseInt(P)
                                        ? (t = c.id_player_two)
                                        : parseInt(c.id_player_two) ===
                                              parseInt(P) &&
                                          (t = c.id_player_one));
                            }),
                            t
                        );
                    },
                    DeleteContact: function (e) {
                        var t = S.filter(function (t) {
                            return t.number !== e;
                        });
                        (S = t),
                            console.log(t),
                            setTimeout(function () {
                                alt.emit('Phone:UpdateContact', w, S);
                            }, 100);
                    },
                    InserRecents: function (e) {
                        if (V.length >= 35)
                            for (var t = 0; t < 10; t++) V.pop(t);
                        V.push({
                            number: e,
                            name: B(e),
                            data: new Date().getTime(),
                        }),
                            setTimeout(function () {
                                alt.emit('Phone:UpdateRecents', w, V);
                            }, 100);
                    },
                    VerifyCharacter: function (e) {
                        if (
                            !(
                                e <= 1 ||
                                null === e ||
                                void 0 === e ||
                                '' === e
                            ) &&
                            e.length >= 2
                        ) {
                            var t = e.split(''),
                                c = 0,
                                n = '';
                            return (
                                t.map(function (e) {
                                    75 === ++c
                                        ? (n = n + e + '...')
                                        : c < 75 && (n += e);
                                }),
                                n
                            );
                        }
                    },
                },
                A = {};
            (A.Functions = O), (A.communication = L);
            var E = A,
                D = c.p + 'static/media/perfil.08e05437.png';
            function _(e) {
                var t = e.children,
                    c = e.color,
                    n = e.fontsize,
                    a = e.outlined,
                    s = e.Margin,
                    i = e.cursor,
                    o = e.to,
                    r = e.onclick;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsx)(b.b, {
                        to: ''.concat(o || []),
                        children: Object(m.jsx)('i', {
                            onClick: r && r,
                            className: a
                                ? 'material-icons-outlined'
                                : 'material-icons',
                            style: {
                                color: c || 'black',
                                fontSize: n || '16px',
                                margin: s || '0',
                                cursor: i ? 'pointer' : 'auto',
                            },
                            children: t,
                        }),
                    }),
                });
            }
            function R(e) {
                var t = e.width,
                    c = e.height;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsx)('div', {
                        className: 'Backgroud',
                        style: {
                            width: t || '35px',
                            height: c || '35px',
                            backgroundImage: 'url('.concat(D, ')'),
                        },
                    }),
                });
            }
            function G(e) {
                var t = e.children;
                e.type;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsx)('div', {
                        style: {
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-start',
                        },
                        children: Object(m.jsx)('div', {
                            style: {
                                backgroundColor: '#bebebe',
                                marginLeft: '5px',
                            },
                            className: 'Bx-msg',
                            children: t,
                        }),
                    }),
                });
            }
            function z(e) {
                var t = e.children;
                e.type;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsx)('div', {
                        style: {
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                        },
                        children: Object(m.jsx)('div', {
                            style: {
                                backgroundColor: '#35c759',
                                color: '#fff',
                                marginRight: '5px',
                            },
                            className: 'Bx-msg',
                            children: t,
                        }),
                    }),
                });
            }
            function H(e) {
                var t = e.children,
                    c = e.title,
                    n = e.onclick,
                    a = e.Pcolor,
                    s = e.Scolor;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsxs)('div', {
                        style: {
                            padding: ' 5px 10px',
                            borderBottom: '1px solid #acacac',
                            color: a || 'black',
                        },
                        children: [
                            Object(m.jsx)('p', { children: c }),
                            Object(m.jsxs)('p', {
                                style: { color: s || '#0179fe' },
                                onClick: n,
                                children: [' ', t, ' '],
                            }),
                        ],
                    }),
                });
            }
            function W(e) {
                var t = e.children,
                    c = e.height,
                    n = e.bcolor,
                    a = e.overflow,
                    s = e.id,
                    i = e.bt,
                    o = e.bb;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsx)('div', {
                        style: {
                            padding: ' 0 0 5px 0',
                            height: c || '100px',
                            borderTop: i ? '1px solid #e5e5e5' : 'none',
                            borderBottom: o ? '1px solid #e5e5e5' : 'none',
                        },
                        children: Object(m.jsx)('div', {
                            id: s,
                            style: {
                                display: 'block',
                                width: '100%',
                                height: '100%',
                                backgroundColor: n || 'transparent',
                                overflow: a ? 'auto' : 'hiden',
                            },
                            children: t,
                        }),
                    }),
                });
            }
            function K(e) {
                var t = e.children,
                    c = e.width,
                    n = e.bcolor,
                    a = e.color,
                    s = e.acenter,
                    i = e.padding;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsx)('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            width: c || '100%',
                            backgroundColor: n || 'transparent',
                            color: a || 'black',
                            alignItems: s ? 'center' : 'start',
                            padding: i || '0',
                        },
                        children: t,
                    }),
                });
            }
            function Q(e) {
                var t = e.children,
                    c = e.width,
                    n = e.bcolor,
                    a = e.color,
                    s = e.acenter,
                    i = e.padding;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsx)('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'center',
                            width: c || '100%',
                            backgroundColor: n || 'transparent',
                            color: a || 'black',
                            alignItems: s ? 'center' : 'start',
                            padding: i || '0',
                        },
                        children: t,
                    }),
                });
            }
            function U(e) {
                var t = e.children,
                    c = e.d,
                    n = e.color,
                    a = e.fontsize,
                    s = e.bcolor,
                    i = e.outlined,
                    o = e.ml,
                    r = e.mr,
                    l = e.cursor,
                    d = e.to,
                    j = e.onclick;
                return (
                    (void 0 !== d && null !== d) || (d = ''),
                    Object(m.jsx)(m.Fragment, {
                        children:
                            d.length >= 1
                                ? Object(m.jsx)(b.b, {
                                      to: d,
                                      children: Object(m.jsx)('div', {
                                          onClick: j,
                                          style: {
                                              display: 'flex',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              color: n || 'white',
                                              width: c,
                                              height: c,
                                              backgroundColor: s || '#0179fe',
                                              borderRadius: '50%',
                                              marginLeft: o || '0',
                                              marginRight: r || '0',
                                              cursor: l ? 'pointer' : 'auto',
                                          },
                                          children: Object(m.jsx)('div', {
                                              style: { fontSize: a || '16px' },
                                              className: i
                                                  ? 'material-icons-outlined'
                                                  : 'material-icons',
                                              children: t,
                                          }),
                                      }),
                                  })
                                : Object(m.jsx)('div', {
                                      onClick: j,
                                      style: {
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          color: n || 'white',
                                          width: c,
                                          height: c,
                                          backgroundColor: s || '#0179fe',
                                          borderRadius: '50%',
                                          marginLeft: o || '0',
                                          marginRight: r || '0',
                                          cursor: l ? 'pointer' : 'auto',
                                      },
                                      children: Object(m.jsx)('div', {
                                          style: { fontSize: a || '16px' },
                                          className: i
                                              ? 'material-icons-outlined'
                                              : 'material-icons',
                                          children: t,
                                      }),
                                  }),
                    })
                );
            }
            function J(e) {
                var t = e.children,
                    c = e.title,
                    n = e.to,
                    a = e.onclick,
                    s = e.bcolor,
                    i = e.colorCicle,
                    o = e.color;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsxs)('div', {
                        children: [
                            Object(m.jsx)(Q, {
                                width: '50px',
                                children: Object(m.jsx)(U, {
                                    onclick: a,
                                    to: n,
                                    backgroundColor: s || '#0179fe',
                                    color: i || '#fff',
                                    fontsize: '17px',
                                    d: '30px',
                                    children: t,
                                }),
                            }),
                            Object(m.jsx)('p', {
                                style: {
                                    paddingTop: '2px',
                                    color: o || '#929292',
                                    fontSize: '8px',
                                    width: '100%',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                },
                                children: c,
                            }),
                        ],
                    }),
                });
            }
            function X(e) {
                var t = e.children,
                    c = e.width,
                    n = e.margin,
                    a = e.color,
                    s = e.txtaling,
                    i = e.to,
                    o = e.onclick,
                    r = e.cursor;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsx)(b.b, {
                        to: ''.concat(i || []),
                        children: Object(m.jsx)('p', {
                            onClick: o,
                            style: {
                                margin: n || '0',
                                cursor: r || 'auto',
                                width: c || '100%',
                                color: a || '#0179fe',
                                textAlign: s || 'center',
                            },
                            children: t,
                        }),
                    }),
                });
            }
            function q(e) {
                var t = e.children,
                    c = e.childrenLeft,
                    n = e.childrenRight;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsxs)('div', {
                        style: {
                            display: 'flex',
                            width: '240px',
                            padding: '10px 5px',
                            fontSize: '13px',
                            fontWeight: '600',
                        },
                        children: [
                            Object(m.jsx)('div', {
                                style: { width: '75px' },
                                children: c,
                            }),
                            Object(m.jsx)('div', {
                                style: { width: '80px' },
                                children: t,
                            }),
                            Object(m.jsx)('div', {
                                style: { width: ' 75px' },
                                children: n,
                            }),
                        ],
                    }),
                });
            }
            function Y(e) {
                var t = e.setMain,
                    a = e.setDesfoc,
                    s = e.setBackBar;
                Object(n.useEffect)(
                    function () {
                        t({ color: 'transparent', img: 'url('.concat(c(15)) }),
                            a('block'),
                            s(!1);
                    },
                    [t, a, s]
                );
                var i = E.Functions.useQuery(),
                    r = Object(n.useState)('false'),
                    l = Object(o.a)(r, 2),
                    d = l[0],
                    j = l[1],
                    b = Object(n.useState)(!1),
                    u = Object(o.a)(b, 2),
                    h = u[0],
                    x = u[1],
                    O = Object(n.useState)(i.get('number')),
                    f = Object(o.a)(O, 2),
                    p = f[0],
                    g = f[1],
                    v = Object(n.useState)('space-between'),
                    N = Object(o.a)(v, 2),
                    C = N[0],
                    I = N[1],
                    y = Object(n.useState)({ incal: !1, decorido: 0 }),
                    P = Object(o.a)(y, 2),
                    w = P[0],
                    M = P[1];
                return (
                    Object(n.useEffect)(
                        function () {
                            w.incal &&
                                setTimeout(function () {
                                    return M({
                                        incal: !0,
                                        decorido: w.decorido + 1,
                                    });
                                }, 1e3);
                        },
                        [w]
                    ),
                    Object(n.useEffect)(function () {
                        'true' === i.get('chamada') &&
                            (I('center'), j('chamando')),
                            'true' === i.get('recebendo')
                                ? (k({ type: 'play' }),
                                  E.communication.InserRecents(i.get('number')))
                                : F({ type: 'play' }),
                            E.communication.CheckAtlV() &&
                                alt.on('Phone:InChanel', function () {
                                    'false' === i.get('recebendo') &&
                                        (g(E.communication.MyNumber()),
                                        x(!0),
                                        M({ incal: !0, decorido: 0 }),
                                        F({ type: 'stop' }),
                                        j('incall'));
                                });
                    }, []),
                    Object(m.jsxs)('div', {
                        className: 'BoxMainCallLink',
                        children: [
                            Object(m.jsxs)('div', {
                                className: 'BoxViwerCallLink',
                                children: [
                                    Object(m.jsx)('h1', {
                                        children: E.communication.VerifyContact(
                                            i.get('number')
                                        ),
                                    }),
                                    ')',
                                    'incall' === d
                                        ? Object(m.jsx)('p', {
                                              children: E.Functions.TimeFormat(
                                                  w.decorido
                                              ),
                                          })
                                        : 'chamando' === d
                                        ? Object(m.jsx)('p', {
                                              children: 'Chamando',
                                          })
                                        : Object(m.jsx)(m.Fragment, {}),
                                    d &&
                                        Object(m.jsx)('div', {
                                            className: 'BoxToolsCallLinkExt ',
                                            children: Object(m.jsxs)('div', {
                                                className: 'BoxToolsCallLink',
                                                children: [
                                                    Object(m.jsxs)('div', {
                                                        className:
                                                            'LineNumberCallLinkTools mb-3',
                                                        children: [
                                                            Object(m.jsx)(Z, {
                                                                name: 'Mute',
                                                                children:
                                                                    'mic_off',
                                                            }),
                                                            Object(m.jsx)(Z, {
                                                                name: 'Keypad',
                                                                children:
                                                                    'dialpad',
                                                            }),
                                                            Object(m.jsx)(Z, {
                                                                name: 'Audio',
                                                                children:
                                                                    'volume_off',
                                                            }),
                                                        ],
                                                    }),
                                                    Object(m.jsxs)('div', {
                                                        className:
                                                            'LineNumberCallLinkTools',
                                                        children: [
                                                            Object(m.jsx)(Z, {
                                                                name: 'Add call',
                                                                children: 'add',
                                                            }),
                                                            Object(m.jsx)(Z, {
                                                                name: 'FaceTime',
                                                                children:
                                                                    'videocam',
                                                            }),
                                                            Object(m.jsx)(Z, {
                                                                name: 'Contacts',
                                                                children:
                                                                    'people',
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        }),
                                ],
                            }),
                            Object(m.jsx)('div', {
                                className: 'CallLinkFull',
                                children: Object(m.jsxs)('div', {
                                    className: 'LineNumberCallLink',
                                    style: { justifyContent: C },
                                    children: [
                                        Object(m.jsx)(U, {
                                            to: '/',
                                            fontsize: '26px',
                                            bcolor: '#eb4e3d',
                                            d: '50px',
                                            onclick: function () {
                                                E.communication.DestroyCall(
                                                    p,
                                                    i.get('number'),
                                                    h
                                                ),
                                                    F({ type: 'stop' });
                                            },
                                            children: 'call_end',
                                        }),
                                        'incall' === d || 'chamando' === d
                                            ? Object(m.jsx)(m.Fragment, {})
                                            : Object(m.jsx)(U, {
                                                  fontsize: '26px',
                                                  bcolor: '#35c759',
                                                  d: '50px',
                                                  to: '/PhoneCallfull/CallLink?chamada=true&number='
                                                      .concat(
                                                          i.get('number'),
                                                          '&recebendo='
                                                      )
                                                      .concat(
                                                          i.get('recebendo')
                                                      ),
                                                  onclick: function () {
                                                      E.communication.AceptCall(
                                                          i.get('number')
                                                      ),
                                                          j('incall'),
                                                          I('center'),
                                                          'true' ===
                                                              i.get(
                                                                  'recebendo'
                                                              ) &&
                                                              (x(!0),
                                                              M({
                                                                  incal: !0,
                                                                  decorido: 1,
                                                              }));
                                                  },
                                                  children: 'call',
                                              }),
                                    ],
                                }),
                            }),
                        ],
                    })
                );
            }
            function Z(e) {
                var t = e.children,
                    c = e.name,
                    n = e.onclick;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsxs)('div', {
                        className: 'NumberCenterCallLinkToolsExt',
                        children: [
                            Object(m.jsx)('div', {
                                className: 'NumberCenterCallLinkTools ',
                                onClick: n,
                                children: Object(m.jsx)('i', {
                                    class: 'material-icons',
                                    children: t,
                                }),
                            }),
                            Object(m.jsx)('p', { children: c }),
                        ],
                    }),
                });
            }
            function $(e) {
                var t = e.setMain,
                    c = e.setDesfoc,
                    a = E.Functions.useQuery();
                Object(n.useEffect)(
                    function () {
                        t({ color: '#f8f7fc', img: 'none' }), c('none');
                    },
                    [t, c]
                );
                var s = Object(n.useState)({
                        number: a.get('number') ? a.get('number') : '',
                        data: {
                            name: '',
                            sobrenome: '',
                            favorito: !1,
                            img: '',
                        },
                    }),
                    i = Object(o.a)(s, 2),
                    r = i[0],
                    l = i[1];
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsxs)('div', {
                        className: 'BoxMainInfoContactadd',
                        children: [
                            Object(m.jsx)(q, {
                                childrenLeft: Object(m.jsx)(X, {
                                    txtaling: 'left',
                                    to: '/PhoneCallFull/PhoneApp?aba='.concat(
                                        a.get('lastpage')
                                    ),
                                    cursor: !0,
                                    children: 'Cacelar',
                                }),
                                childrenRight: Object(m.jsx)(X, {
                                    to: '/',
                                    color: 'Black',
                                    txtaling: 'right',
                                    onclick: function () {
                                        E.communication.SaveContact(r);
                                    },
                                    cursor: !0,
                                    children: 'OK',
                                }),
                                children: Object(m.jsx)(X, {
                                    color: 'black',
                                    children: 'New Contact',
                                }),
                            }),
                            Object(m.jsx)(Q, {
                                children: Object(m.jsx)('div', {
                                    className: 'PerfilContactsAdd',
                                }),
                            }),
                            Object(m.jsx)(Q, {
                                padding: '5px 0',
                                children: Object(m.jsx)('p', {
                                    className: 'addFoto Tx-a-c blueC',
                                    children: 'Adicionar Foto',
                                }),
                            }),
                            Object(m.jsxs)('div', {
                                className: 'CardContactsTools',
                                children: [
                                    Object(m.jsx)('div', {
                                        className: 'NumberCenterNovoContato',
                                        children: Object(m.jsx)('input', {
                                            type: 'text',
                                            placeholder: 'Nome',
                                            onKeyUp: function (e) {
                                                l({
                                                    number: r.number,
                                                    data: {
                                                        name: e.target.value,
                                                        sobrenome:
                                                            r.data.sobrenome,
                                                        favorito:
                                                            r.data.favorito,
                                                        img: r.data.img,
                                                    },
                                                });
                                            },
                                        }),
                                    }),
                                    Object(m.jsx)('div', {
                                        className: 'NumberCenterNovoContato',
                                        children: Object(m.jsx)('input', {
                                            type: 'text',
                                            placeholder: 'Sobrenome',
                                            onKeyUp: function (e) {
                                                l({
                                                    number: r.number,
                                                    data: {
                                                        name: r.data.name,
                                                        sobrenome:
                                                            e.target.value,
                                                        favorito:
                                                            r.data.favorito,
                                                        img: r.data.img,
                                                    },
                                                });
                                            },
                                        }),
                                    }),
                                    Object(m.jsx)('div', {
                                        className: 'NumberCenterNovoContato',
                                        children:
                                            9 === r.number.length
                                                ? Object(m.jsx)('input', {
                                                      className: 'input',
                                                      type: 'text',
                                                      placeholder: 'Peeeehone',
                                                      value: E.Functions.FormatStringNumber(
                                                          r.number
                                                      ),
                                                      disabled: !0,
                                                  })
                                                : Object(m.jsx)('input', {
                                                      className: 'input',
                                                      type: 'text',
                                                      placeholder: 'Phone',
                                                      onChange: function (e) {
                                                          l({
                                                              number: e.target
                                                                  .value,
                                                              data: {
                                                                  name: r.data
                                                                      .name,
                                                                  sobrenome:
                                                                      r.data
                                                                          .sobrenome,
                                                                  favorito:
                                                                      r.data
                                                                          .favorito,
                                                                  img: r.data
                                                                      .img,
                                                              },
                                                          });
                                                      },
                                                  }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                });
            }
            function ee(e) {
                var t = e.setMain,
                    c = e.setDesfoc,
                    a = E.Functions.useQuery();
                return (
                    Object(n.useEffect)(
                        function () {
                            t({ color: '#f8f7fc', img: 'none' }), c('none');
                        },
                        [t, c]
                    ),
                    Object(m.jsx)(m.Fragment, {
                        children: Object(m.jsxs)('div', {
                            className: 'BoxMainInfoContact',
                            children: [
                                Object(m.jsxs)('label', {
                                    children: [
                                        Object(m.jsx)(_, {
                                            fontsize: '20px',
                                            color: '#0179fe',
                                            to: '/PhoneCallFull/PhoneApp?aba='.concat(
                                                a.get('lastpage')
                                            ),
                                            children: 'chevron_left',
                                        }),
                                        Object(m.jsx)('p', {
                                            children: 'Contacts',
                                        }),
                                    ],
                                }),
                                Object(m.jsx)('div', {
                                    className: 'FullContact',
                                    children: Object(m.jsx)(R, {
                                        width: '70px',
                                        height: '70px',
                                    }),
                                }),
                                Object(m.jsx)('div', {
                                    className: 'FullContact',
                                    children: a.get('name'),
                                }),
                                Object(m.jsxs)(K, {
                                    children: [
                                        Object(m.jsx)(J, {
                                            to: '/PhoneCallFull/MesageIn?number='.concat(
                                                a.get('number'),
                                                '&buscar=true'
                                            ),
                                            title: 'Message',
                                            children: 'chat_bubble',
                                        }),
                                        Object(m.jsx)(J, {
                                            to: '/PhoneCallfull/CallLink?number='.concat(
                                                a.get('number'),
                                                '&recebendo=false&chamada=true'
                                            ),
                                            onclick: function () {
                                                E.communication.CallNumber(
                                                    a.get('number')
                                                ),
                                                    E.communication.InserRecents(
                                                        a.get('number')
                                                    );
                                            },
                                            title: 'Call',
                                            children: 'local_phone',
                                        }),
                                        Object(m.jsx)(J, {
                                            title: 'WhatsApp',
                                            children: 'whatsapp',
                                        }),
                                    ],
                                }),
                                Object(m.jsxs)('div', {
                                    className: 'CardContactsTools',
                                    children: [
                                        Object(m.jsx)(H, {
                                            title: 'Name',
                                            children: a.get('name'),
                                        }),
                                        Object(m.jsx)(H, {
                                            title: 'Phone',
                                            children: a.get('number'),
                                        }),
                                        Object(m.jsx)(H, {
                                            children: 'Remove From Favourites',
                                        }),
                                        Object(m.jsx)(H, {
                                            onclick: function () {
                                                E.communication.DeleteContact(
                                                    a.get('number')
                                                );
                                            },
                                            children: 'Remove Contact',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    })
                );
            }
            function te() {
                var e = Object(n.useState)(!1),
                    t = Object(o.a)(e, 2),
                    c = t[0],
                    a = t[1],
                    s = Object(n.useState)(''),
                    i = Object(o.a)(s, 2),
                    r = i[0],
                    l = i[1];
                function d(e) {
                    r.length < 9 && l(r + e);
                }
                return (
                    Object(n.useEffect)(
                        function () {
                            var e = r.length;
                            a(e > 0);
                        },
                        [r]
                    ),
                    Object(m.jsxs)(m.Fragment, {
                        children: [
                            Object(m.jsx)('div', {
                                className: 'BoxDisc',
                                children: Object(m.jsx)('h1', {
                                    id: 'NumberDisc',
                                    children: E.Functions.FormatStringNumber(r),
                                }),
                            }),
                            Object(m.jsxs)('div', {
                                className: 'BoxNumber',
                                children: [
                                    Object(m.jsxs)('div', {
                                        className: 'LineNumber mb-2',
                                        children: [
                                            Object(m.jsx)(ce, {
                                                caracter: '',
                                                onclick: function () {
                                                    d('1');
                                                },
                                                children: '1',
                                            }),
                                            Object(m.jsx)(ce, {
                                                caracter: 'A B C',
                                                onclick: function () {
                                                    d('2');
                                                },
                                                children: '2',
                                            }),
                                            Object(m.jsx)(ce, {
                                                caracter: 'D E F',
                                                onclick: function () {
                                                    d('3');
                                                },
                                                children: '3',
                                            }),
                                        ],
                                    }),
                                    Object(m.jsxs)('div', {
                                        className: 'LineNumber mb-2',
                                        children: [
                                            Object(m.jsx)(ce, {
                                                caracter: 'G H I',
                                                onclick: function () {
                                                    d('4');
                                                },
                                                children: '4 ',
                                            }),
                                            Object(m.jsx)(ce, {
                                                caracter: 'J K L',
                                                onclick: function () {
                                                    d('5');
                                                },
                                                children: '5',
                                            }),
                                            Object(m.jsx)(ce, {
                                                caracter: 'M N O',
                                                onclick: function () {
                                                    d('6');
                                                },
                                                children: '6',
                                            }),
                                        ],
                                    }),
                                    Object(m.jsxs)('div', {
                                        className: 'LineNumber mb-2',
                                        children: [
                                            Object(m.jsx)(ce, {
                                                caracter: 'P Q R S',
                                                onclick: function () {
                                                    d('7');
                                                },
                                                children: '7',
                                            }),
                                            Object(m.jsx)(ce, {
                                                caracter: 'T U V',
                                                onclick: function () {
                                                    d('8');
                                                },
                                                children: '8',
                                            }),
                                            Object(m.jsx)(ce, {
                                                caracter: 'W X Y Z',
                                                onclick: function () {
                                                    d('9');
                                                },
                                                children: '9',
                                            }),
                                        ],
                                    }),
                                    Object(m.jsxs)('div', {
                                        className: 'LineNumber mb-2',
                                        children: [
                                            Object(m.jsx)('div', {
                                                className: 'NumberCenter',
                                                onClick: function () {
                                                    d('*');
                                                },
                                                children: Object(m.jsx)('i', {
                                                    className:
                                                        'fal fa-asterisk',
                                                }),
                                            }),
                                            Object(m.jsxs)('div', {
                                                className: 'Number',
                                                onClick: function () {
                                                    d('0');
                                                },
                                                children: [
                                                    Object(m.jsx)('h1', {
                                                        children: '0',
                                                    }),
                                                    Object(m.jsx)('p', {
                                                        children: Object(m.jsx)(
                                                            'i',
                                                            {
                                                                class: 'fal fa-plus',
                                                            }
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            Object(m.jsx)('div', {
                                                className: 'NumberCenter',
                                                onClick: function () {
                                                    d('#');
                                                },
                                                children: Object(m.jsx)('i', {
                                                    class: 'fal fa-hashtag',
                                                }),
                                            }),
                                        ],
                                    }),
                                    Object(m.jsxs)('div', {
                                        className: 'LineNumber mb-2',
                                        children: [
                                            Object(m.jsx)('div', {
                                                className: 'FakeNumber',
                                                children:
                                                    c &&
                                                    Object(m.jsx)(_, {
                                                        to: '/PhoneCallFull/Novocontato?lastpage=dialpad&number='.concat(
                                                            r
                                                        ),
                                                        color: '#0179fe',
                                                        fontsize: '26px',
                                                        children: 'add',
                                                    }),
                                            }),
                                            Object(m.jsx)(U, {
                                                to: '/PhoneCallfull/CallLink?number='.concat(
                                                    r,
                                                    '&recebendo=false&chamada=true'
                                                ),
                                                fontsize: '26px',
                                                d: '50px',
                                                onclick: function () {
                                                    E.communication.CallNumber(
                                                        r
                                                    ),
                                                        E.communication.InserRecents(
                                                            r
                                                        );
                                                },
                                                bcolor: '#35c759',
                                                cursor: !0,
                                                children: 'call',
                                            }),
                                            Object(m.jsx)('div', {
                                                className: 'FakeNumber',
                                                children:
                                                    c &&
                                                    Object(m.jsx)(_, {
                                                        onclick: function () {
                                                            l(
                                                                r.substring(
                                                                    0,
                                                                    r.length - 1
                                                                )
                                                            );
                                                        },
                                                        children: 'backspace',
                                                    }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    })
                );
            }
            function ce(e) {
                var t = e.children,
                    c = e.caracter,
                    n = e.onclick;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsxs)('div', {
                        className: 'Number',
                        onClick: n,
                        children: [
                            Object(m.jsx)('h1', { children: t }),
                            Object(m.jsx)('p', { children: c }),
                        ],
                    }),
                });
            }
            function ne() {
                var e = Object(n.useState)(E.communication.GetContact()),
                    t = Object(o.a)(e, 1)[0],
                    c = Object(n.useState)(''),
                    a = Object(o.a)(c, 2),
                    s = a[0],
                    i = a[1];
                return Object(m.jsxs)(m.Fragment, {
                    children: [
                        Object(m.jsxs)('div', {
                            className: 'ContactsViweI',
                            children: [
                                Object(m.jsxs)('div', {
                                    className: 'between',
                                    children: [
                                        Object(m.jsx)('h1', {
                                            children: 'Contacts',
                                        }),
                                        Object(m.jsx)(_, {
                                            to: '/PhoneCallFull/Novocontato?lastpage=contacts',
                                            color: '#0179fe',
                                            fontsize: '19px',
                                            cursor: !0,
                                            outlined: !0,
                                            children: 'add',
                                        }),
                                    ],
                                }),
                                Object(m.jsxs)('div', {
                                    className: 'input-grup',
                                    children: [
                                        Object(m.jsx)('i', {
                                            class: 'fal fa-search ml-1',
                                        }),
                                        Object(m.jsx)('input', {
                                            className: 'Input ml-2',
                                            type: 'text',
                                            placeholder: 'Search',
                                            onChange: function (e) {
                                                i(e.target.value);
                                            },
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        Object(m.jsx)('div', {
                            className: 'ContactsViweII',
                            children: t.map(function (e) {
                                if (
                                    -1 !=
                                    e.data.name
                                        .toLowerCase()
                                        .indexOf(s.toLowerCase())
                                )
                                    return Object(m.jsx)(ae, { db: e });
                            }),
                        }),
                    ],
                });
            }
            function ae(e) {
                var t = e.db;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsx)('div', {
                        className: 'CardContacts mt-1',
                        children: Object(m.jsx)(b.b, {
                            to: '/PhoneCallFull/infoContacts?number='
                                .concat(t.number, '&name=')
                                .concat(t.data.name, '&favorito=')
                                .concat(t.data.favorito, '&lastpage=contacts'),
                            children: Object(m.jsx)('div', {
                                className: 'InfoCardContacts a-c',
                                children: Object(m.jsx)('p', {
                                    className: 'name mb-1',
                                    children: t.data.name,
                                }),
                            }),
                        }),
                    }),
                });
            }
            function se(e) {
                var t = e.setMain,
                    c = e.setDesfoc,
                    a =
                        (e.BackPage,
                        Object(n.useState)({ I: !0, II: !1, III: !1, IV: !1 })),
                    s = Object(o.a)(a, 2),
                    i = s[0],
                    r = s[1],
                    l = Object(n.useState)(E.communication.GetContact()),
                    d =
                        (Object(o.a)(l, 1)[0],
                        Object(n.useState)(E.communication.GetRecents())),
                    j = Object(o.a)(d, 1)[0],
                    b = Object(n.useState)(!1),
                    u = Object(o.a)(b, 2),
                    h = u[0],
                    x = u[1],
                    O = E.Functions.useQuery();
                function f() {
                    return Object(m.jsxs)(m.Fragment, {
                        children: [
                            Object(m.jsx)('div', {
                                className: 'FavouritessViweI',
                                children: Object(m.jsx)('div', {
                                    className: 'between',
                                    children: Object(m.jsx)('h1', {
                                        children: 'Favourites',
                                    }),
                                }),
                            }),
                            Object(m.jsx)('div', {
                                className: 'FavouritesViweII',
                            }),
                        ],
                    });
                }
                function p() {
                    return Object(m.jsxs)(m.Fragment, {
                        children: [
                            Object(m.jsx)('div', {
                                className: 'RecentViweI',
                                children: Object(m.jsx)('h1', {
                                    children: 'Recentes',
                                }),
                            }),
                            Object(m.jsx)('div', {
                                className: 'RecentViweII',
                                children: j
                                    .map(function (e) {
                                        return Object(m.jsx)(oe, {
                                            db: e,
                                            data: E.Functions.WhatTime(e.data),
                                        });
                                    })
                                    .reverse(),
                            }),
                        ],
                    });
                }
                return (
                    Object(n.useEffect)(
                        function () {
                            t({ color: '#f8f7fc', img: 'none' }), c('none');
                        },
                        [t, c]
                    ),
                    Object(n.useEffect)(
                        function () {
                            var e = !0;
                            switch (O.get('aba')) {
                                case 'dialpad':
                                    r({ I: e, II: !1, III: !1, IV: !1 });
                                    break;
                                case 'contacts':
                                    r({ I: !1, II: e, III: !1, IV: !1 });
                                    break;
                                case 'recents':
                                    r({ I: !1, II: !1, III: e, IV: !1 });
                                    break;
                                case 'favourites':
                                    r({ I: !1, II: !1, III: !1, IV: e });
                            }
                        },
                        [h]
                    ),
                    Object(m.jsx)(m.Fragment, {
                        children: Object(m.jsxs)('div', {
                            className: 'BVMainFull',
                            children: [
                                Object(m.jsxs)('div', {
                                    className: 'CallViwer',
                                    children: [
                                        i.I && Object(m.jsx)(te, {}),
                                        i.II && Object(m.jsx)(ne, {}),
                                        i.III && Object(m.jsx)(p, {}),
                                        i.IV && Object(m.jsx)(f, {}),
                                    ],
                                }),
                                Object(m.jsxs)('div', {
                                    className: 'CallTols',
                                    children: [
                                        Object(m.jsx)(ie, {
                                            name: 'Favorites',
                                            to: '/PhoneCallFull/PhoneApp?aba=favourites',
                                            onclick: function () {
                                                return x(!h);
                                            },
                                            children: 'star',
                                        }),
                                        Object(m.jsx)(ie, {
                                            name: 'Recents',
                                            to: '/PhoneCallFull/PhoneApp?aba=recents',
                                            onclick: function () {
                                                return x(!h);
                                            },
                                            children: 'schedule',
                                        }),
                                        Object(m.jsx)(ie, {
                                            name: 'Contacts',
                                            to: '/PhoneCallFull/PhoneApp?aba=contacts',
                                            onclick: function () {
                                                return x(!h);
                                            },
                                            children: 'account_circle',
                                        }),
                                        Object(m.jsx)(ie, {
                                            name: 'Keypad',
                                            to: '/PhoneCallFull/PhoneApp?aba=dialpad',
                                            onclick: function () {
                                                return x(!h);
                                            },
                                            children: 'dialpad',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    })
                );
            }
            function ie(e) {
                var t = e.children,
                    c = e.name,
                    n = e.to,
                    a = e.onclick;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsx)(b.b, {
                        to: n,
                        children: Object(m.jsxs)('div', {
                            className: 'CallTolsIcon',
                            onClick: a,
                            children: [
                                Object(m.jsx)('div', {
                                    className: 'j-c',
                                    children: Object(m.jsx)('i', {
                                        class: 'material-icons',
                                        children: t,
                                    }),
                                }),
                                Object(m.jsx)('p', { children: c }),
                            ],
                        }),
                    }),
                });
            }
            function oe(e) {
                var t = e.db,
                    c = e.data;
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsxs)('div', {
                        className: 'CardRecente',
                        children: [
                            Object(m.jsx)('div', {
                                className: 'IconCard',
                                children: Object(m.jsx)('i', {
                                    class: 'material-icons',
                                    children: 'phone_forwarded',
                                }),
                            }),
                            Object(m.jsxs)('div', {
                                className: 'InfoCard a-c',
                                children: [
                                    Object(m.jsxs)('div', {
                                        className: 'InfoBox',
                                        children: [
                                            Object(m.jsx)('p', {
                                                className: 'name',
                                                children: t.name,
                                            }),
                                            Object(m.jsx)('p', {
                                                className: 'phone',
                                                children: t.number,
                                            }),
                                        ],
                                    }),
                                    Object(m.jsxs)('div', {
                                        className: 'InfoBox a-c mr-2',
                                        children: [
                                            Object(m.jsx)('p', {
                                                className: 'time',
                                                children: c,
                                            }),
                                            Object(m.jsx)(b.b, {
                                                to: '/PhoneCallFull/infoContacts?number='
                                                    .concat(t.number, '&name=')
                                                    .concat(
                                                        t.name,
                                                        '&favorito=',
                                                        '&lastpage=recents'
                                                    ),
                                                children: Object(m.jsx)('i', {
                                                    class: 'fal fa-info-circle ml-1',
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                });
            }
            function re(e) {
                e.setMain, e.setDesfoc, E.Functions.useQuery();
                var t = Object(n.useState)(E.communication.GetHistory()),
                    c = Object(o.a)(t, 2),
                    a = c[0];
                c[1];
                return Object(m.jsx)(m.Fragment, {
                    children: Object(m.jsxs)('div', {
                        className: 'BoxMainMesages',
                        children: [
                            Object(m.jsxs)('label', {
                                className: 'TopBar-Tools',
                                children: [
                                    Object(m.jsx)(b.b, {
                                        to: '/',
                                        children: Object(m.jsxs)('div', {
                                            className: 'flex',
                                            children: [
                                                Object(m.jsx)('i', {
                                                    class: 'material-icons-outlined blueC',
                                                    children: 'chevron_left',
                                                }),
                                                Object(m.jsx)('p', {
                                                    className: 'blueC',
                                                    children: 'Back',
                                                }),
                                            ],
                                        }),
                                    }),
                                    Object(m.jsx)('p', {
                                        className: 'Tx-a-r',
                                        children: 'OK',
                                    }),
                                ],
                            }),
                            Object(m.jsx)('div', {
                                className: 'TitleViwer',
                                children: Object(m.jsx)('h1', {
                                    children: 'Mensagens',
                                }),
                            }),
                            Object(m.jsx)('div', {
                                className: 'MensageViweII',
                                children: a.map(function (e) {
                                    if (0 !== e.contain_message)
                                        return Object(m.jsx)('div', {
                                            children: Object(m.jsx)(b.b, {
                                                to: '/PhoneCallFull/MesageIn?number='
                                                    .concat(
                                                        E.communication.WhatPhone(
                                                            e.id
                                                        ),
                                                        '&chat_id='
                                                    )
                                                    .concat(e.id),
                                                children: Object(m.jsxs)(
                                                    'div',
                                                    {
                                                        className:
                                                            'CardMensage ',
                                                        onClick: function () {
                                                            E.communication.GetChatId(
                                                                e.id
                                                            );
                                                        },
                                                        children: [
                                                            Object(m.jsx)(R, {
                                                                width: '35px',
                                                                height: '35px',
                                                            }),
                                                            Object(m.jsxs)(
                                                                'div',
                                                                {
                                                                    className:
                                                                        'InfoCardMensage ',
                                                                    children: [
                                                                        Object(
                                                                            m.jsxs
                                                                        )(
                                                                            'label',
                                                                            {
                                                                                className:
                                                                                    'name between',
                                                                                children:
                                                                                    [
                                                                                        Object(
                                                                                            m.jsx
                                                                                        )(
                                                                                            'p',
                                                                                            {
                                                                                                children:
                                                                                                    E.communication.VerifyContact(
                                                                                                        E.communication.WhatPhone(
                                                                                                            e.id
                                                                                                        )
                                                                                                    ),
                                                                                            }
                                                                                        ),
                                                                                        Object(
                                                                                            m.jsxs
                                                                                        )(
                                                                                            'div',
                                                                                            {
                                                                                                className:
                                                                                                    'leftMensage flex ',
                                                                                                children:
                                                                                                    [
                                                                                                        Object(
                                                                                                            m.jsx
                                                                                                        )(
                                                                                                            'p',
                                                                                                            {
                                                                                                                className:
                                                                                                                    'mr-2',
                                                                                                                children:
                                                                                                                    '10:40',
                                                                                                            }
                                                                                                        ),
                                                                                                        Object(
                                                                                                            m.jsx
                                                                                                        )(
                                                                                                            'i',
                                                                                                            {
                                                                                                                class: 'material-icons-outlined',
                                                                                                                children:
                                                                                                                    'chevron_right',
                                                                                                            }
                                                                                                        ),
                                                                                                    ],
                                                                                            }
                                                                                        ),
                                                                                    ],
                                                                            }
                                                                        ),
                                                                        Object(
                                                                            m.jsx
                                                                        )('p', {
                                                                            className:
                                                                                'TxtAreaMensage',
                                                                            children:
                                                                                E.communication.VerifyCharacter(
                                                                                    e.last_message
                                                                                ),
                                                                        }),
                                                                    ],
                                                                }
                                                            ),
                                                        ],
                                                    }
                                                ),
                                            }),
                                        });
                                }),
                            }),
                        ],
                    }),
                });
            }
            var le = c(13);
            function de(e) {
                var t = e.setMain,
                    c = e.setDesfoc,
                    a = E.Functions.useQuery();
                Object(n.useEffect)(
                    function () {
                        t({ color: '#fff', img: 'none' }), c('none');
                    },
                    [t, c]
                );
                var s = Object(n.useState)(E.communication.GetSSN()),
                    i = Object(o.a)(s, 1)[0],
                    r = Object(n.useState)([]),
                    l = Object(o.a)(r, 2),
                    d = l[0],
                    j = l[1],
                    b = Object(n.useState)(''),
                    u = Object(o.a)(b, 2),
                    h = u[0],
                    x = u[1],
                    O = Object(n.useState)(''),
                    f = Object(o.a)(O, 2),
                    p = f[0],
                    g = f[1];
                return (
                    Object(n.useEffect)(function () {
                        g(a.get('chat_id')),
                            'true' === a.get('buscar') &&
                                alt.emit('Phone:GetChatId', a.get('number')),
                            je(),
                            E.communication.CheckAtlV() &&
                                (alt.on('Phone:GetChatMessage', function (e) {
                                    j(e), je();
                                }),
                                alt.on('Phone:ReciveMessage', function (e) {
                                    E.communication.GetChatId(e.chat_id);
                                }),
                                alt.on('Phone:GetIdChat', function (e) {
                                    g(e);
                                }));
                    }, []),
                    Object(m.jsx)(m.Fragment, {
                        children: Object(m.jsxs)('div', {
                            className: 'BoxMainMesages',
                            children: [
                                Object(m.jsxs)('label', {
                                    className: 'TopBar-Tools',
                                    children: [
                                        Object(m.jsxs)('div', {
                                            className: 'boxMsgPadrao',
                                            children: [
                                                Object(m.jsx)(_, {
                                                    color: '#0179fe',
                                                    fontsize: '24px',
                                                    ml: '-11px',
                                                    to: '/PhoneCallFull/Mesage',
                                                    cursor: !0,
                                                    outlined: !0,
                                                    children: 'chevron_left',
                                                }),
                                                Object(m.jsx)('p', {
                                                    className: 'blueC',
                                                    style: {
                                                        marginLeft: '-3px',
                                                    },
                                                    children: 'Back',
                                                }),
                                            ],
                                        }),
                                        Object(m.jsxs)('div', {
                                            className: 'boxIMmensage',
                                            children: [
                                                Object(m.jsx)('div', {
                                                    className: 'PefilMsg',
                                                    children: Object(m.jsx)(R, {
                                                        width: '40px',
                                                        height: '40px',
                                                    }),
                                                }),
                                                Object(m.jsx)('p', {
                                                    className: 'phone',
                                                    children: a.get('number'),
                                                }),
                                            ],
                                        }),
                                        Object(m.jsx)('p', {
                                            className: 'boxMsgPadrao Tx-a-r',
                                        }),
                                    ],
                                }),
                                Object(m.jsx)(W, {
                                    height: '386px',
                                    bcolor: '#fff',
                                    id: 'message',
                                    bt: !0,
                                    overflow: !0,
                                    children: d.map(function (e) {
                                        return (
                                            console.log(i),
                                            e.ssn == i
                                                ? Object(m.jsx)(z, {
                                                      children: e.message,
                                                  })
                                                : Object(m.jsx)(G, {
                                                      children: e.message,
                                                  })
                                        );
                                    }),
                                }),
                                Object(m.jsxs)('div', {
                                    className: 'InputConversation',
                                    children: [
                                        Object(m.jsx)(_, {
                                            color: '#35c759',
                                            fontsize: '20px',
                                            mr: '5px',
                                            onclick: function () {
                                                j(
                                                    [].concat(Object(le.a)(d), [
                                                        {
                                                            ssn: i,
                                                            type: '',
                                                            menssage: Object(
                                                                m.jsx
                                                            )(_, {
                                                                color: '#fff',
                                                                cursor: !0,
                                                                children:
                                                                    'share_location',
                                                            }),
                                                        },
                                                    ])
                                                ),
                                                    x(''),
                                                    je();
                                            },
                                            cursor: !0,
                                            outlined: !0,
                                            children: 'room',
                                        }),
                                        Object(m.jsxs)('div', {
                                            className: 'input-grup-mensage',
                                            children: [
                                                Object(m.jsx)('input', {
                                                    className: 'Input ml-1',
                                                    type: 'text',
                                                    placeholder: 'Search',
                                                    value: h,
                                                    onChange: function (e) {
                                                        x(e.target.value);
                                                    },
                                                    onKeyUp: function (e) {
                                                        'Enter' === e.key &&
                                                            (E.Functions.VerifyTxt(
                                                                h
                                                            ) &&
                                                                (j(
                                                                    [].concat(
                                                                        Object(
                                                                            le.a
                                                                        )(d),
                                                                        [
                                                                            {
                                                                                type: 'msg',
                                                                                ssn: i,
                                                                                message:
                                                                                    h,
                                                                            },
                                                                        ]
                                                                    )
                                                                ),
                                                                x(''),
                                                                je()),
                                                            E.communication.CreateMessage(
                                                                'msg',
                                                                h,
                                                                p,
                                                                a.get('number')
                                                            ));
                                                    },
                                                }),
                                                Object(m.jsx)('div', {
                                                    className: 'BtnSend ',
                                                    onClick: function () {
                                                        E.Functions.VerifyTxt(
                                                            h
                                                        ) &&
                                                            (E.communication.CreateMessage(
                                                                'msg',
                                                                h,
                                                                p,
                                                                a.get('number')
                                                            ),
                                                            j(
                                                                [].concat(
                                                                    Object(
                                                                        le.a
                                                                    )(d),
                                                                    [
                                                                        {
                                                                            type: 'msg',
                                                                            ssn: i,
                                                                            message:
                                                                                h,
                                                                        },
                                                                    ]
                                                                )
                                                            ),
                                                            x(''),
                                                            je());
                                                    },
                                                    children: Object(m.jsx)(
                                                        'i',
                                                        {
                                                            class: 'material-icons-outlined',
                                                            children:
                                                                'arrow_upward',
                                                        }
                                                    ),
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    })
                );
            }
            function je() {
                var e = document.getElementById('message');
                e.scrollTop = e.scrollHeight - e.clientHeight;
            }
            function be(e) {
                var t = e.setMain,
                    c = e.setDesfoc,
                    a = Object(n.useState)({ I: !1, II: !1, III: !1, IV: !1 }),
                    s = Object(o.a)(a, 2),
                    i = s[0],
                    r = s[1],
                    l = Object(n.useState)(!0),
                    d = Object(o.a)(l, 2),
                    j = d[0],
                    u = d[1],
                    h = Object(x.g)().appType;
                return (
                    Object(n.useEffect)(
                        function () {
                            t({ color: '#f8f7fc', img: 'none' }), c('none');
                        },
                        [t, c]
                    ),
                    Object(n.useEffect)(
                        function () {
                            var e = !0;
                            switch (h) {
                                case 'infoContacts':
                                    r({
                                        I: e,
                                        II: !1,
                                        III: !1,
                                        IV: !1,
                                        V: !1,
                                        VI: !1,
                                    });
                                    break;
                                case 'CallLink':
                                    r({
                                        I: !1,
                                        II: e,
                                        III: !1,
                                        IV: !1,
                                        V: !1,
                                        VI: !1,
                                    });
                                    break;
                                case 'Novocontato':
                                    r({
                                        I: !1,
                                        II: !1,
                                        III: e,
                                        IV: !1,
                                        V: !1,
                                        VI: !1,
                                    });
                                    break;
                                case 'PhoneApp':
                                    r({
                                        I: !1,
                                        II: !1,
                                        III: !1,
                                        IV: e,
                                        V: !1,
                                        VI: !1,
                                    });
                                    break;
                                case 'Mesage':
                                    r({
                                        I: !1,
                                        II: !1,
                                        III: !1,
                                        IV: !1,
                                        V: e,
                                        VI: !1,
                                    });
                                    break;
                                case 'MesageIn':
                                    r({
                                        I: !1,
                                        II: !1,
                                        III: !1,
                                        IV: !1,
                                        V: !1,
                                        VI: e,
                                    });
                            }
                        },
                        [h]
                    ),
                    Object(m.jsxs)(m.Fragment, {
                        children: [
                            Object(m.jsxs)('div', {
                                className: 'BVMainFull',
                                children: [
                                    i.I &&
                                        Object(m.jsx)(ee, {
                                            setMain: t,
                                            setDesfoc: c,
                                        }),
                                    i.II &&
                                        Object(m.jsx)(Y, {
                                            setMain: t,
                                            setDesfoc: c,
                                            setBackBar: u,
                                        }),
                                    i.III &&
                                        Object(m.jsx)($, {
                                            setMain: t,
                                            setDesfoc: c,
                                        }),
                                    i.IV &&
                                        Object(m.jsx)(se, {
                                            setMain: t,
                                            setDesfoc: c,
                                        }),
                                    i.V &&
                                        Object(m.jsx)(re, {
                                            setMain: t,
                                            setDesfoc: c,
                                        }),
                                    i.VI &&
                                        Object(m.jsx)(de, {
                                            setMain: t,
                                            setDesfoc: c,
                                        }),
                                ],
                            }),
                            j &&
                                Object(m.jsx)(b.b, {
                                    to: '/',
                                    children: Object(m.jsx)('div', {
                                        className: 'BarReturnExtern',
                                        children: Object(m.jsx)('div', {
                                            className: 'BarRetunr',
                                            onClick: function () {},
                                        }),
                                    }),
                                }),
                        ],
                    })
                );
            }
            function me(e) {
                var t = e.setMain,
                    a = e.setDesfoc;
                return (
                    Object(n.useEffect)(
                        function () {
                            t({
                                color: 'transparent',
                                img: 'url('.concat(c(15)),
                            }),
                                a('none'),
                                k({ type: 'stop' }),
                                F({ type: 'stop' });
                        },
                        [t, a]
                    ),
                    Object(m.jsxs)(m.Fragment, {
                        children: [
                            Object(m.jsx)('div', {
                                className: 'BVMain',
                                children: Object(m.jsx)('div', {
                                    className: 'j-c',
                                    children: Object(m.jsxs)('div', {
                                        children: [
                                            Object(m.jsx)(v.a.div, {
                                                initial: {
                                                    opacity: 0,
                                                    y: 5,
                                                    left: 1,
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 15,
                                                    left: 0,
                                                },
                                                transition: {
                                                    type: 'spring',
                                                    stiffness: 10,
                                                    damping: 12,
                                                },
                                                className: 'container-main-rg',
                                                children: Object(m.jsxs)(
                                                    'div',
                                                    {
                                                        className: 'ExtNotify',
                                                        children: [
                                                            Object(m.jsxs)(
                                                                'div',
                                                                {
                                                                    className:
                                                                        'topbarNotification',
                                                                    children: [
                                                                        Object(
                                                                            m.jsx
                                                                        )(h, {
                                                                            name: 'menssage',
                                                                            w: '12px',
                                                                            h: '12px',
                                                                            ml: '5px',
                                                                        }),
                                                                        Object(
                                                                            m.jsx
                                                                        )('p', {
                                                                            className:
                                                                                'titleNotify',
                                                                            children:
                                                                                'MESSAGES',
                                                                        }),
                                                                    ],
                                                                }
                                                            ),
                                                            Object(m.jsxs)(
                                                                'div',
                                                                {
                                                                    className:
                                                                        'CorpNotifi',
                                                                    children: [
                                                                        Object(
                                                                            m.jsx
                                                                        )('p', {
                                                                            className:
                                                                                'corpoTXTpincipla',
                                                                            children:
                                                                                'Dudu',
                                                                        }),
                                                                        Object(
                                                                            m.jsx
                                                                        )('p', {
                                                                            className:
                                                                                'txtMensage',
                                                                            children:
                                                                                'E ai como esta o celular?',
                                                                        }),
                                                                    ],
                                                                }
                                                            ),
                                                        ],
                                                    }
                                                ),
                                            }),
                                            Object(m.jsx)(v.a.div, {
                                                initial: {
                                                    opacity: 0,
                                                    y: 5,
                                                    left: 1,
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 15,
                                                    left: 0,
                                                },
                                                transition: {
                                                    type: 'spring',
                                                    stiffness: 10,
                                                    damping: 12,
                                                },
                                                className: 'container-main-rg',
                                                children: Object(m.jsxs)(
                                                    'div',
                                                    {
                                                        className: 'ExtNotify',
                                                        children: [
                                                            Object(m.jsxs)(
                                                                'div',
                                                                {
                                                                    className:
                                                                        'topbarNotification',
                                                                    children: [
                                                                        Object(
                                                                            m.jsx
                                                                        )(h, {
                                                                            name: 'menssage',
                                                                            w: '12px',
                                                                            h: '12px',
                                                                            ml: '5px',
                                                                        }),
                                                                        Object(
                                                                            m.jsx
                                                                        )('p', {
                                                                            className:
                                                                                'titleNotify',
                                                                            children:
                                                                                'MESSAGES',
                                                                        }),
                                                                    ],
                                                                }
                                                            ),
                                                            Object(m.jsxs)(
                                                                'div',
                                                                {
                                                                    className:
                                                                        'CorpNotifi',
                                                                    children: [
                                                                        Object(
                                                                            m.jsx
                                                                        )('p', {
                                                                            className:
                                                                                'corpoTXTpincipla',
                                                                            children:
                                                                                'Ximpanca',
                                                                        }),
                                                                        Object(
                                                                            m.jsx
                                                                        )('p', {
                                                                            className:
                                                                                'txtMensage',
                                                                            children:
                                                                                'Poh curti pra caramba esse visu!',
                                                                        }),
                                                                    ],
                                                                }
                                                            ),
                                                        ],
                                                    }
                                                ),
                                            }),
                                        ],
                                    }),
                                }),
                            }),
                            Object(m.jsx)('div', {
                                className: 'BVRodape',
                                children: Object(m.jsxs)('div', {
                                    className: 'icon-Bar',
                                    children: [
                                        Object(m.jsx)(u, {
                                            img: 'call',
                                            to: '/PhoneCallFull/PhoneApp',
                                        }),
                                        Object(m.jsx)(u, {
                                            img: 'contacts',
                                            to: '/PhoneCallFull/PhoneApp?aba=contacts',
                                        }),
                                        Object(m.jsx)(u, {
                                            img: 'msg',
                                            to: '/PhoneCallFull/Mesage',
                                        }),
                                        Object(m.jsx)(u, {
                                            img: 'camera',
                                            to: '/camera',
                                        }),
                                    ],
                                }),
                            }),
                        ],
                    })
                );
            }
            var ue = function () {
                    var e = Object(n.useState)({
                            color: 'transparent',
                            img: 'url('.concat(c(15)),
                        }),
                        t = Object(o.a)(e, 2),
                        a = t[0],
                        s = t[1],
                        i = Object(n.useState)('none'),
                        r = Object(o.a)(i, 2),
                        l = r[0],
                        d = r[1];
                    return Object(m.jsx)(N, {
                        Main: a,
                        Desfoc: l,
                        children: Object(m.jsxs)(x.c, {
                            children: [
                                Object(m.jsx)(x.a, {
                                    path: '/',
                                    element: Object(m.jsx)(me, {
                                        setMain: s,
                                        setDesfoc: d,
                                    }),
                                }),
                                Object(m.jsx)(x.a, {
                                    path: '/PhoneCallFull/:appType',
                                    element: Object(m.jsx)(be, {
                                        setMain: s,
                                        setDesfoc: d,
                                    }),
                                }),
                            ],
                        }),
                    });
                },
                he = c(21);
            i.a.render(
                Object(m.jsx)(b.a, {
                    children: Object(m.jsx)(a.a.StrictMode, {
                        children: Object(m.jsx)(he.a, {
                            children: Object(m.jsx)(ue, {}),
                        }),
                    }),
                }),
                document.getElementById('root')
            );
        },
    },
    [[73, 1, 2]],
]);
//# sourceMappingURL=main.0e6e9d0d.chunk.js.map
