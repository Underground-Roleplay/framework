(function (t) {
    function e(e) {
        for (
            var i, r, c = e[0], l = e[1], u = e[2], m = 0, d = [];
            m < c.length;
            m++
        )
            (r = c[m]),
                Object.prototype.hasOwnProperty.call(s, r) &&
                    s[r] &&
                    d.push(s[r][0]),
                (s[r] = 0);
        for (i in l)
            Object.prototype.hasOwnProperty.call(l, i) && (t[i] = l[i]);
        a && a(e);
        while (d.length) d.shift()();
        return o.push.apply(o, u || []), n();
    }
    function n() {
        for (var t, e = 0; e < o.length; e++) {
            for (var n = o[e], i = !0, c = 1; c < n.length; c++) {
                var l = n[c];
                0 !== s[l] && (i = !1);
            }
            i && (o.splice(e--, 1), (t = r((r.s = n[0]))));
        }
        return t;
    }
    var i = {},
        s = { app: 0 },
        o = [];
    function r(e) {
        if (i[e]) return i[e].exports;
        var n = (i[e] = { i: e, l: !1, exports: {} });
        return t[e].call(n.exports, n, n.exports, r), (n.l = !0), n.exports;
    }
    (r.m = t),
        (r.c = i),
        (r.d = function (t, e, n) {
            r.o(t, e) ||
                Object.defineProperty(t, e, { enumerable: !0, get: n });
        }),
        (r.r = function (t) {
            'undefined' !== typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(t, Symbol.toStringTag, {
                    value: 'Module',
                }),
                Object.defineProperty(t, '__esModule', { value: !0 });
        }),
        (r.t = function (t, e) {
            if ((1 & e && (t = r(t)), 8 & e)) return t;
            if (4 & e && 'object' === typeof t && t && t.__esModule) return t;
            var n = Object.create(null);
            if (
                (r.r(n),
                Object.defineProperty(n, 'default', {
                    enumerable: !0,
                    value: t,
                }),
                2 & e && 'string' != typeof t)
            )
                for (var i in t)
                    r.d(
                        n,
                        i,
                        function (e) {
                            return t[e];
                        }.bind(null, i)
                    );
            return n;
        }),
        (r.n = function (t) {
            var e =
                t && t.__esModule
                    ? function () {
                          return t['default'];
                      }
                    : function () {
                          return t;
                      };
            return r.d(e, 'a', e), e;
        }),
        (r.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (r.p = '');
    var c = (window['webpackJsonp'] = window['webpackJsonp'] || []),
        l = c.push.bind(c);
    (c.push = e), (c = c.slice());
    for (var u = 0; u < c.length; u++) e(c[u]);
    var a = l;
    o.push([0, 'chunk-vendors']), n();
})({
    0: function (t, e, n) {
        t.exports = n('cd49');
    },
    '034f': function (t, e, n) {
        'use strict';
        n('85ec');
    },
    '217d': function (t, e, n) {
        'use strict';
        n('c12b');
    },
    '85ec': function (t, e, n) {},
    c12b: function (t, e, n) {},
    cd49: function (t, e, n) {
        'use strict';
        n.r(e);
        n('e260'),
            n('e6cf'),
            n('cca6'),
            n('a79d'),
            n('99af'),
            n('d3b7'),
            n('25f0');
        var i = n('2b0e'),
            s = function () {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n('v-app', { attrs: { id: 'app' } }, [n('Menu')], 1);
            },
            o = [],
            r = function () {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n(
                    'div',
                    [
                        t.show
                            ? n(
                                  'v-container',
                                  {
                                      staticClass: 'fill-height',
                                      attrs: { fluid: '' },
                                  },
                                  [
                                      n(
                                          'v-row',
                                          {
                                              attrs: {
                                                  align: 'end',
                                                  justify: 'end',
                                              },
                                          },
                                          [
                                              n(
                                                  'v-card',
                                                  {
                                                      staticStyle: {
                                                          'margin-right': '1vw',
                                                          'margin-top': '40vh',
                                                      },
                                                      attrs: { width: '300' },
                                                  },
                                                  [
                                                      n(
                                                          'v-list-item',
                                                          {
                                                              style: {
                                                                  backgroundColor:
                                                                      t.bgColor,
                                                              },
                                                          },
                                                          [
                                                              n(
                                                                  'v-list-item-content',
                                                                  [
                                                                      n(
                                                                          'v-list-item-title',
                                                                          {
                                                                              staticClass:
                                                                                  'title',
                                                                              on: {
                                                                                  click: function (
                                                                                      e
                                                                                  ) {
                                                                                      return t.focusInput(
                                                                                          t
                                                                                              .items[0]
                                                                                              .id,
                                                                                          !0
                                                                                      );
                                                                                  },
                                                                              },
                                                                          },
                                                                          [
                                                                              t._v(
                                                                                  ' ' +
                                                                                      t._s(
                                                                                          t.title
                                                                                      ) +
                                                                                      ' '
                                                                              ),
                                                                          ]
                                                                      ),
                                                                      n(
                                                                          'v-list-item-subtitle',
                                                                          [
                                                                              t._v(
                                                                                  ' ' +
                                                                                      t._s(
                                                                                          t.subtitle
                                                                                      ) +
                                                                                      ' '
                                                                              ),
                                                                          ]
                                                                      ),
                                                                  ],
                                                                  1
                                                              ),
                                                          ],
                                                          1
                                                      ),
                                                      n('v-divider'),
                                                      n(
                                                          'v-list',
                                                          {
                                                              attrs: {
                                                                  dense: '',
                                                                  nav: '',
                                                              },
                                                          },
                                                          [
                                                              n(
                                                                  'v-container',
                                                                  {
                                                                      staticClass:
                                                                          'overflow-y-auto',
                                                                      staticStyle:
                                                                          {
                                                                              'max-height':
                                                                                  '40vh',
                                                                          },
                                                                  },
                                                                  t._l(
                                                                      t.items,
                                                                      function (
                                                                          e,
                                                                          i
                                                                      ) {
                                                                          return n(
                                                                              'v-list-item',
                                                                              {
                                                                                  key: e.id,
                                                                                  ref:
                                                                                      'item-' +
                                                                                      i,
                                                                                  refInFor:
                                                                                      !0,
                                                                                  class: {
                                                                                      activeItem:
                                                                                          t.currentSelection ===
                                                                                          i,
                                                                                      removedPadding:
                                                                                          !!e.rightText,
                                                                                  },
                                                                                  staticStyle:
                                                                                      {
                                                                                          'max-height':
                                                                                              '2vh',
                                                                                      },
                                                                                  attrs: {
                                                                                      shaped: !0,
                                                                                      link: '',
                                                                                      disabled:
                                                                                          e.disabled,
                                                                                  },
                                                                                  on: {
                                                                                      click: function (
                                                                                          e
                                                                                      ) {
                                                                                          t.currentSelection =
                                                                                              i;
                                                                                      },
                                                                                  },
                                                                              },
                                                                              [
                                                                                  e.icon
                                                                                      ? n(
                                                                                            'v-list-item-icon',
                                                                                            {
                                                                                                staticStyle:
                                                                                                    {
                                                                                                        'margin-right':
                                                                                                            '0.5vw',
                                                                                                    },
                                                                                            },
                                                                                            [
                                                                                                n(
                                                                                                    'v-icon',
                                                                                                    {
                                                                                                        domProps:
                                                                                                            {
                                                                                                                textContent:
                                                                                                                    t._s(
                                                                                                                        e.icon
                                                                                                                    ),
                                                                                                            },
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                            1
                                                                                        )
                                                                                      : t._e(),
                                                                                  n(
                                                                                      'v-list-item-title',
                                                                                      [
                                                                                          t._v(
                                                                                              t._s(
                                                                                                  e.text
                                                                                              )
                                                                                          ),
                                                                                      ]
                                                                                  ),
                                                                                  'Item' !==
                                                                                      e.type &&
                                                                                  'InputItem' !==
                                                                                      e.type
                                                                                      ? n(
                                                                                            'v-list-item-icon',
                                                                                            [
                                                                                                'ForwardItem' ===
                                                                                                e.type
                                                                                                    ? n(
                                                                                                          'v-icon',
                                                                                                          [
                                                                                                              t._v(
                                                                                                                  'mdi-arrow-right-bold'
                                                                                                              ),
                                                                                                          ]
                                                                                                      )
                                                                                                    : 'BackItem' ===
                                                                                                      e.type
                                                                                                    ? n(
                                                                                                          'v-icon',
                                                                                                          [
                                                                                                              t._v(
                                                                                                                  'mdi-arrow-left-bold'
                                                                                                              ),
                                                                                                          ]
                                                                                                      )
                                                                                                    : 'CheckboxItem' !==
                                                                                                          e.type ||
                                                                                                      e.checked
                                                                                                    ? 'CheckboxItem' ===
                                                                                                          e.type &&
                                                                                                      e.checked
                                                                                                        ? n(
                                                                                                              'v-icon',
                                                                                                              [
                                                                                                                  t._v(
                                                                                                                      'mdi-checkbox-marked-outline'
                                                                                                                  ),
                                                                                                              ]
                                                                                                          )
                                                                                                        : t._e()
                                                                                                    : n(
                                                                                                          'v-icon',
                                                                                                          [
                                                                                                              t._v(
                                                                                                                  'mdi-checkbox-blank-outline'
                                                                                                              ),
                                                                                                          ]
                                                                                                      ),
                                                                                            ],
                                                                                            1
                                                                                        )
                                                                                      : t._e(),
                                                                                  e.rightIcon
                                                                                      ? n(
                                                                                            'v-list-item-icon',
                                                                                            [
                                                                                                n(
                                                                                                    'v-icon',
                                                                                                    [
                                                                                                        t._v(
                                                                                                            ' ' +
                                                                                                                t._s(
                                                                                                                    e.rightIcon
                                                                                                                ) +
                                                                                                                ' '
                                                                                                        ),
                                                                                                    ]
                                                                                                ),
                                                                                            ],
                                                                                            1
                                                                                        )
                                                                                      : t._e(),
                                                                                  e.rightText
                                                                                      ? n(
                                                                                            'v-list-item-icon',
                                                                                            {
                                                                                                staticStyle:
                                                                                                    {
                                                                                                        width: '10vw',
                                                                                                        'margin-left':
                                                                                                            '0',
                                                                                                    },
                                                                                            },
                                                                                            [
                                                                                                n(
                                                                                                    'p',
                                                                                                    {
                                                                                                        staticStyle:
                                                                                                            {
                                                                                                                'font-size':
                                                                                                                    '0.75vw',
                                                                                                                margin: 'auto',
                                                                                                            },
                                                                                                    },
                                                                                                    [
                                                                                                        t._v(
                                                                                                            ' ' +
                                                                                                                t._s(
                                                                                                                    e.rightText
                                                                                                                ) +
                                                                                                                ' '
                                                                                                        ),
                                                                                                    ]
                                                                                                ),
                                                                                            ]
                                                                                        )
                                                                                      : t._e(),
                                                                                  'InputItem' ===
                                                                                  e.type
                                                                                      ? n(
                                                                                            'v-text-field',
                                                                                            {
                                                                                                ref:
                                                                                                    'input-' +
                                                                                                    e.id,
                                                                                                refInFor:
                                                                                                    !0,
                                                                                                staticStyle:
                                                                                                    {
                                                                                                        width: '6vw',
                                                                                                    },
                                                                                                attrs: {
                                                                                                    type: e.inputType,
                                                                                                    placeholder:
                                                                                                        e.placeholder,
                                                                                                    spellcheck:
                                                                                                        'false',
                                                                                                },
                                                                                                model: {
                                                                                                    value: e.input,
                                                                                                    callback:
                                                                                                        function (
                                                                                                            n
                                                                                                        ) {
                                                                                                            t.$set(
                                                                                                                e,
                                                                                                                'input',
                                                                                                                n
                                                                                                            );
                                                                                                        },
                                                                                                    expression:
                                                                                                        'item.input',
                                                                                                },
                                                                                            }
                                                                                        )
                                                                                      : t._e(),
                                                                                  'ListItem' ===
                                                                                  e.type
                                                                                      ? n(
                                                                                            'v-list-item-icon',
                                                                                            {
                                                                                                staticStyle:
                                                                                                    {
                                                                                                        width: '10vw',
                                                                                                        'margin-right':
                                                                                                            '2.3vw',
                                                                                                    },
                                                                                            },
                                                                                            [
                                                                                                n(
                                                                                                    'v-icon',
                                                                                                    {
                                                                                                        staticStyle:
                                                                                                            {
                                                                                                                'margin-right':
                                                                                                                    '0.4vw',
                                                                                                            },
                                                                                                    },
                                                                                                    [
                                                                                                        t._v(
                                                                                                            'mdi-arrow-left'
                                                                                                        ),
                                                                                                    ]
                                                                                                ),
                                                                                                n(
                                                                                                    'p',
                                                                                                    {
                                                                                                        key:
                                                                                                            'listItem-' +
                                                                                                            e.selectedItem,
                                                                                                        staticStyle:
                                                                                                            {
                                                                                                                width: '7.2vw',
                                                                                                                'text-align':
                                                                                                                    'center',
                                                                                                            },
                                                                                                        style: {
                                                                                                            fontSize:
                                                                                                                0.9 -
                                                                                                                0.02 *
                                                                                                                    e
                                                                                                                        .items[
                                                                                                                        e
                                                                                                                            .selectedItem
                                                                                                                    ]
                                                                                                                        .text
                                                                                                                        .length +
                                                                                                                'vw',
                                                                                                        },
                                                                                                    },
                                                                                                    [
                                                                                                        t._v(
                                                                                                            ' ' +
                                                                                                                t._s(
                                                                                                                    e
                                                                                                                        .items[
                                                                                                                        e
                                                                                                                            .selectedItem
                                                                                                                    ]
                                                                                                                        .text
                                                                                                                ) +
                                                                                                                ' '
                                                                                                        ),
                                                                                                    ]
                                                                                                ),
                                                                                                n(
                                                                                                    'v-icon',
                                                                                                    {
                                                                                                        staticStyle:
                                                                                                            {
                                                                                                                'margin-left':
                                                                                                                    '0.4vw',
                                                                                                            },
                                                                                                    },
                                                                                                    [
                                                                                                        t._v(
                                                                                                            'mdi-arrow-right'
                                                                                                        ),
                                                                                                    ]
                                                                                                ),
                                                                                            ],
                                                                                            1
                                                                                        )
                                                                                      : t._e(),
                                                                              ],
                                                                              1
                                                                          );
                                                                      }
                                                                  ),
                                                                  1
                                                              ),
                                                              n(
                                                                  'v-list-item-subtitle',
                                                                  {
                                                                      staticClass:
                                                                          'float-left',
                                                                      staticStyle:
                                                                          {
                                                                              'margin-top':
                                                                                  '0.5vh',
                                                                          },
                                                                  },
                                                                  [
                                                                      t._v(
                                                                          ' ' +
                                                                              t._s(
                                                                                  this
                                                                                      .currentSelection +
                                                                                      1
                                                                              ) +
                                                                              ' / ' +
                                                                              t._s(
                                                                                  t
                                                                                      .items
                                                                                      .length
                                                                              ) +
                                                                              ' '
                                                                      ),
                                                                  ]
                                                              ),
                                                          ],
                                                          1
                                                      ),
                                                  ],
                                                  1
                                              ),
                                          ],
                                          1
                                      ),
                                  ],
                                  1
                              )
                            : t._e(),
                    ],
                    1
                );
            },
            c = [],
            l = n('2909'),
            u =
                (n('c740'),
                n('a434'),
                n('7db0'),
                {
                    name: 'Menu',
                    data: function () {
                        return {
                            show: !1,
                            title: '',
                            subtitle: '',
                            items: [],
                            currentSelection: 0,
                            bgColor: null,
                        };
                    },
                    methods: {
                        toggle: function (t) {
                            (this.show = t), t || (this.currentSelection = 0);
                        },
                        addItem: function (t) {
                            this.items = [].concat(Object(l['a'])(this.items), [
                                t,
                            ]);
                        },
                        removeItem: function (t) {
                            var e = this.items.findIndex(function (e) {
                                return e.id === t;
                            });
                            -1 !== e && this.items.splice(e, 1);
                        },
                        clear: function () {
                            this.items = [];
                        },
                        setTitle: function (t) {
                            this.title = t;
                        },
                        setSubtitle: function (t) {
                            this.subtitle = t;
                        },
                        setBgColor: function (t) {
                            this.bgColor = t;
                        },
                        setChecked: function (t, e) {
                            var n = this.items.find(function (e) {
                                return e.id === t;
                            });
                            n && (n.checked = e);
                        },
                        setItemText: function (t, e) {
                            var n = this.items.find(function (e) {
                                return e.id === t;
                            });
                            n && (n.text = e);
                        },
                        setItemIcon: function (t, e) {
                            var n = this.items.find(function (e) {
                                return e.id === t;
                            });
                            n && (n.icon = e);
                        },
                        setItemDisabled: function (t, e) {
                            var n = this.items.find(function (e) {
                                return e.id === t;
                            });
                            n && (n.disabled = e);
                        },
                        setItemRightIcon: function (t, e) {
                            var n = this.items.find(function (e) {
                                return e.id === t;
                            });
                            n && (n.rightIcon = e);
                        },
                        setItemRightText: function (t, e) {
                            var n = this.items.find(function (e) {
                                return e.id === t;
                            });
                            n && (n.rightText = e);
                        },
                        setInput: function (t, e) {
                            var n = this.items.find(function (e) {
                                return e.id === t;
                            });
                            n && (n.input = e);
                        },
                        setInputType: function (t, e) {
                            var n = this.items.find(function (e) {
                                return e.id === t;
                            });
                            n && (n.inputType = e);
                        },
                        setInputPlaceholder: function (t, e) {
                            var n = this.items.find(function (e) {
                                return e.id === t;
                            });
                            n && (n.placeholder = e);
                        },
                        setSelectedListItem: function (t, e) {
                            var n = this.items.find(function (e) {
                                return e.id === t;
                            });
                            n && (n.selectedItem = e);
                        },
                        focusInput: function (t, e) {
                            var n = this.$refs['input-'.concat(t)],
                                i =
                                    n[0].$el.children[0].children[0].children[0]
                                        .children[0];
                            if (e) i.focus();
                            else {
                                var s = this.items.find(function (e) {
                                    return e.id === t;
                                });
                                alt.emit('menu:setInput', s.id, s.input),
                                    i.blur();
                            }
                        },
                        moveUp: function () {
                            0 === this.currentSelection
                                ? (this.currentSelection =
                                      this.items.length - 1)
                                : this.currentSelection--;
                            var t =
                                this.$refs['item-' + this.currentSelection][0]
                                    .$el;
                            t.focus();
                        },
                        moveDown: function () {
                            this.currentSelection === this.items.length - 1
                                ? (this.currentSelection = 0)
                                : this.currentSelection++;
                            var t =
                                this.$refs['item-' + this.currentSelection][0]
                                    .$el;
                            t.focus();
                        },
                        moveLeft: function () {
                            var t = this.items[this.currentSelection];
                            'ListItem' === t.type &&
                                (0 === t.selectedItem
                                    ? (t.selectedItem = t.items.length - 1)
                                    : t.selectedItem--,
                                alt.emit(
                                    'menu:setListItem',
                                    t.id,
                                    t.selectedItem
                                ));
                        },
                        moveRight: function () {
                            var t = this.items[this.currentSelection];
                            'ListItem' === t.type &&
                                (t.selectedItem === t.items.length - 1
                                    ? (t.selectedItem = 0)
                                    : t.selectedItem++,
                                alt.emit(
                                    'menu:setListItem',
                                    t.id,
                                    t.selectedItem
                                ));
                        },
                        select: function () {
                            var t = this.items[this.currentSelection];
                            alt.emit(
                                'menu:select',
                                t.id,
                                this.currentSelection
                            );
                        },
                    },
                    created: function () {
                        'alt' in window &&
                            (alt.on('menu:toggle', this.toggle),
                            alt.on('menu:addItem', this.addItem),
                            alt.on('menu:removeItem', this.removeItem),
                            alt.on('menu:clear', this.clear),
                            alt.on('menu:setTitle', this.setTitle),
                            alt.on('menu:setSubtitle', this.setSubtitle),
                            alt.on('menu:setBgColor', this.setBgColor),
                            alt.on('menu:setInput', this.setInput),
                            alt.on('menu:setInputType', this.setInputType),
                            alt.on(
                                'menu:setInputPlaceholder',
                                this.setInputPlaceholder
                            ),
                            alt.on('menu:setItemChecked', this.setChecked),
                            alt.on('menu:setItemText', this.setItemText),
                            alt.on('menu:setItemIcon', this.setItemIcon),
                            alt.on(
                                'menu:setItemDisabled',
                                this.setItemDisabled
                            ),
                            alt.on(
                                'menu:setItemRightIcon',
                                this.setItemRightIcon
                            ),
                            alt.on(
                                'menu:setItemRightText',
                                this.setItemRightText
                            ),
                            alt.on(
                                'menu:setSelectedListItem',
                                this.setSelectedListItem
                            ),
                            alt.on('menu:focusInput', this.focusInput),
                            alt.on('menu:moveUp', this.moveUp),
                            alt.on('menu:moveDown', this.moveDown),
                            alt.on('menu:moveLeft', this.moveLeft),
                            alt.on('menu:moveRight', this.moveRight),
                            alt.on('menu:select', this.select));
                    },
                }),
            a = u,
            m = (n('217d'), n('2877')),
            d = n('6544'),
            h = n.n(d),
            f = n('b0af'),
            v = n('a523'),
            p = n('ce7e'),
            I = n('132d'),
            g = n('8860'),
            b = n('da13'),
            y = n('5d23'),
            w = n('34c3'),
            S = n('0fd9'),
            _ = n('8654'),
            x = Object(m['a'])(a, r, c, !1, null, '76525064', null),
            k = x.exports;
        h()(x, {
            VCard: f['a'],
            VContainer: v['a'],
            VDivider: p['a'],
            VIcon: I['a'],
            VList: g['a'],
            VListItem: b['a'],
            VListItemContent: y['a'],
            VListItemIcon: w['a'],
            VListItemSubtitle: y['b'],
            VListItemTitle: y['c'],
            VRow: S['a'],
            VTextField: _['a'],
        });
        var T = {
                components: { Menu: k },
                data: function () {
                    return {};
                },
                methods: {},
                mounted: function () {
                    this.$vuetify.theme.dark = !0;
                },
            },
            C = T,
            L = (n('034f'), n('7496')),
            O = Object(m['a'])(C, s, o, !1, null, null, null),
            j = O.exports;
        h()(O, { VApp: L['a'] });
        var V = n('f309'),
            P = n('0fe0'),
            R = n.n(P),
            $ = n('da5b'),
            D = n.n($);
        i['a'].use(V['a']);
        var M = new V['a']({
            lang: { locales: { de: R.a, en: D.a }, current: 'en' },
            theme: { themes: { light: { primary: '#f8992d' } }, dark: !0 },
        });
        n('d5e8'), n('5363');
        (i['a'].config.productionTip = !1),
            new i['a']({
                vuetify: M,
                render: function (t) {
                    return t(j);
                },
            }).$mount('#app'),
            'alt' in window ||
                (window.alt = {
                    emit: function (t) {
                        for (
                            var e = arguments.length,
                                n = new Array(e > 1 ? e - 1 : 0),
                                i = 1;
                            i < e;
                            i++
                        )
                            n[i - 1] = arguments[i];
                        console.log(
                            'Event emitted: '
                                .concat(t, ' (Args: ')
                                .concat(n.toString(), ')')
                        );
                    },
                    on: function (t, e) {
                        console.log("Added event handler for '".concat(t, "'"));
                    },
                    off: function (t, e) {
                        console.log(
                            "Removed event handler for '".concat(t, "'")
                        );
                    },
                });
    },
});
//# sourceMappingURL=app.7ffb6200.js.map
