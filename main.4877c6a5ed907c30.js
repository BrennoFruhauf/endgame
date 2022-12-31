"use strict";
(self.webpackChunkangular_blog = self.webpackChunkangular_blog || []).push([
	[179],
	{
		119: () => {
			function ie(e) {
				return "function" == typeof e;
			}
			function ei(e) {
				const n = e((r) => {
					Error.call(r), (r.stack = new Error().stack);
				});
				return (
					(n.prototype = Object.create(Error.prototype)),
					(n.prototype.constructor = n),
					n
				);
			}
			const Ao = ei(
				(e) =>
					function (n) {
						e(this),
							(this.message = n
								? `${n.length} errors occurred during unsubscription:\n${n
										.map((r, i) => `${i + 1}) ${r.toString()}`)
										.join("\n  ")}`
								: ""),
							(this.name = "UnsubscriptionError"),
							(this.errors = n);
					}
			);
			function ti(e, t) {
				if (e) {
					const n = e.indexOf(t);
					0 <= n && e.splice(n, 1);
				}
			}
			class st {
				constructor(t) {
					(this.initialTeardown = t),
						(this.closed = !1),
						(this._parentage = null),
						(this._finalizers = null);
				}
				unsubscribe() {
					let t;
					if (!this.closed) {
						this.closed = !0;
						const { _parentage: n } = this;
						if (n)
							if (((this._parentage = null), Array.isArray(n)))
								for (const o of n) o.remove(this);
							else n.remove(this);
						const { initialTeardown: r } = this;
						if (ie(r))
							try {
								r();
							} catch (o) {
								t = o instanceof Ao ? o.errors : [o];
							}
						const { _finalizers: i } = this;
						if (i) {
							this._finalizers = null;
							for (const o of i)
								try {
									gd(o);
								} catch (s) {
									(t = t ?? []),
										s instanceof Ao ? (t = [...t, ...s.errors]) : t.push(s);
								}
						}
						if (t) throw new Ao(t);
					}
				}
				add(t) {
					var n;
					if (t && t !== this)
						if (this.closed) gd(t);
						else {
							if (t instanceof st) {
								if (t.closed || t._hasParent(this)) return;
								t._addParent(this);
							}
							(this._finalizers =
								null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
								t
							);
						}
				}
				_hasParent(t) {
					const { _parentage: n } = this;
					return n === t || (Array.isArray(n) && n.includes(t));
				}
				_addParent(t) {
					const { _parentage: n } = this;
					this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
				}
				_removeParent(t) {
					const { _parentage: n } = this;
					n === t ? (this._parentage = null) : Array.isArray(n) && ti(n, t);
				}
				remove(t) {
					const { _finalizers: n } = this;
					n && ti(n, t), t instanceof st && t._removeParent(this);
				}
			}
			st.EMPTY = (() => {
				const e = new st();
				return (e.closed = !0), e;
			})();
			const hd = st.EMPTY;
			function pd(e) {
				return (
					e instanceof st ||
					(e && "closed" in e && ie(e.remove) && ie(e.add) && ie(e.unsubscribe))
				);
			}
			function gd(e) {
				ie(e) ? e() : e.unsubscribe();
			}
			const wn = {
					onUnhandledError: null,
					onStoppedNotification: null,
					Promise: void 0,
					useDeprecatedSynchronousErrorHandling: !1,
					useDeprecatedNextContext: !1,
				},
				xo = {
					setTimeout(e, t, ...n) {
						const { delegate: r } = xo;
						return r?.setTimeout
							? r.setTimeout(e, t, ...n)
							: setTimeout(e, t, ...n);
					},
					clearTimeout(e) {
						const { delegate: t } = xo;
						return (t?.clearTimeout || clearTimeout)(e);
					},
					delegate: void 0,
				};
			function md(e) {
				xo.setTimeout(() => {
					const { onUnhandledError: t } = wn;
					if (!t) throw e;
					t(e);
				});
			}
			function vd() {}
			const U_ = Sa("C", void 0, void 0);
			function Sa(e, t, n) {
				return { kind: e, value: t, error: n };
			}
			let bn = null;
			function Ro(e) {
				if (wn.useDeprecatedSynchronousErrorHandling) {
					const t = !bn;
					if ((t && (bn = { errorThrown: !1, error: null }), e(), t)) {
						const { errorThrown: n, error: r } = bn;
						if (((bn = null), n)) throw r;
					}
				} else e();
			}
			class Pa extends st {
				constructor(t) {
					super(),
						(this.isStopped = !1),
						t
							? ((this.destination = t), pd(t) && t.add(this))
							: (this.destination = Q_);
				}
				static create(t, n, r) {
					return new ni(t, n, r);
				}
				next(t) {
					this.isStopped
						? Oa(
								(function H_(e) {
									return Sa("N", e, void 0);
								})(t),
								this
						  )
						: this._next(t);
				}
				error(t) {
					this.isStopped
						? Oa(
								(function B_(e) {
									return Sa("E", void 0, e);
								})(t),
								this
						  )
						: ((this.isStopped = !0), this._error(t));
				}
				complete() {
					this.isStopped
						? Oa(U_, this)
						: ((this.isStopped = !0), this._complete());
				}
				unsubscribe() {
					this.closed ||
						((this.isStopped = !0),
						super.unsubscribe(),
						(this.destination = null));
				}
				_next(t) {
					this.destination.next(t);
				}
				_error(t) {
					try {
						this.destination.error(t);
					} finally {
						this.unsubscribe();
					}
				}
				_complete() {
					try {
						this.destination.complete();
					} finally {
						this.unsubscribe();
					}
				}
			}
			const q_ = Function.prototype.bind;
			function Ta(e, t) {
				return q_.call(e, t);
			}
			class G_ {
				constructor(t) {
					this.partialObserver = t;
				}
				next(t) {
					const { partialObserver: n } = this;
					if (n.next)
						try {
							n.next(t);
						} catch (r) {
							No(r);
						}
				}
				error(t) {
					const { partialObserver: n } = this;
					if (n.error)
						try {
							n.error(t);
						} catch (r) {
							No(r);
						}
					else No(t);
				}
				complete() {
					const { partialObserver: t } = this;
					if (t.complete)
						try {
							t.complete();
						} catch (n) {
							No(n);
						}
				}
			}
			class ni extends Pa {
				constructor(t, n, r) {
					let i;
					if ((super(), ie(t) || !t))
						i = {
							next: t ?? void 0,
							error: n ?? void 0,
							complete: r ?? void 0,
						};
					else {
						let o;
						this && wn.useDeprecatedNextContext
							? ((o = Object.create(t)),
							  (o.unsubscribe = () => this.unsubscribe()),
							  (i = {
									next: t.next && Ta(t.next, o),
									error: t.error && Ta(t.error, o),
									complete: t.complete && Ta(t.complete, o),
							  }))
							: (i = t);
					}
					this.destination = new G_(i);
				}
			}
			function No(e) {
				wn.useDeprecatedSynchronousErrorHandling
					? (function z_(e) {
							wn.useDeprecatedSynchronousErrorHandling &&
								bn &&
								((bn.errorThrown = !0), (bn.error = e));
					  })(e)
					: md(e);
			}
			function Oa(e, t) {
				const { onStoppedNotification: n } = wn;
				n && xo.setTimeout(() => n(e, t));
			}
			const Q_ = {
					closed: !0,
					next: vd,
					error: function W_(e) {
						throw e;
					},
					complete: vd,
				},
				Aa =
					("function" == typeof Symbol && Symbol.observable) || "@@observable";
			function Mn(e) {
				return e;
			}
			function yd(e) {
				return 0 === e.length
					? Mn
					: 1 === e.length
					? e[0]
					: function (n) {
							return e.reduce((r, i) => i(r), n);
					  };
			}
			let Ce = (() => {
				class e {
					constructor(n) {
						n && (this._subscribe = n);
					}
					lift(n) {
						const r = new e();
						return (r.source = this), (r.operator = n), r;
					}
					subscribe(n, r, i) {
						const o = (function Y_(e) {
							return (
								(e && e instanceof Pa) ||
								((function K_(e) {
									return e && ie(e.next) && ie(e.error) && ie(e.complete);
								})(e) &&
									pd(e))
							);
						})(n)
							? n
							: new ni(n, r, i);
						return (
							Ro(() => {
								const { operator: s, source: a } = this;
								o.add(
									s
										? s.call(o, a)
										: a
										? this._subscribe(o)
										: this._trySubscribe(o)
								);
							}),
							o
						);
					}
					_trySubscribe(n) {
						try {
							return this._subscribe(n);
						} catch (r) {
							n.error(r);
						}
					}
					forEach(n, r) {
						return new (r = _d(r))((i, o) => {
							const s = new ni({
								next: (a) => {
									try {
										n(a);
									} catch (u) {
										o(u), s.unsubscribe();
									}
								},
								error: o,
								complete: i,
							});
							this.subscribe(s);
						});
					}
					_subscribe(n) {
						var r;
						return null === (r = this.source) || void 0 === r
							? void 0
							: r.subscribe(n);
					}
					[Aa]() {
						return this;
					}
					pipe(...n) {
						return yd(n)(this);
					}
					toPromise(n) {
						return new (n = _d(n))((r, i) => {
							let o;
							this.subscribe(
								(s) => (o = s),
								(s) => i(s),
								() => r(o)
							);
						});
					}
				}
				return (e.create = (t) => new e(t)), e;
			})();
			function _d(e) {
				var t;
				return null !== (t = e ?? wn.Promise) && void 0 !== t ? t : Promise;
			}
			const X_ = ei(
				(e) =>
					function () {
						e(this),
							(this.name = "ObjectUnsubscribedError"),
							(this.message = "object unsubscribed");
					}
			);
			let Ut = (() => {
				class e extends Ce {
					constructor() {
						super(),
							(this.closed = !1),
							(this.currentObservers = null),
							(this.observers = []),
							(this.isStopped = !1),
							(this.hasError = !1),
							(this.thrownError = null);
					}
					lift(n) {
						const r = new Cd(this, this);
						return (r.operator = n), r;
					}
					_throwIfClosed() {
						if (this.closed) throw new X_();
					}
					next(n) {
						Ro(() => {
							if ((this._throwIfClosed(), !this.isStopped)) {
								this.currentObservers ||
									(this.currentObservers = Array.from(this.observers));
								for (const r of this.currentObservers) r.next(n);
							}
						});
					}
					error(n) {
						Ro(() => {
							if ((this._throwIfClosed(), !this.isStopped)) {
								(this.hasError = this.isStopped = !0), (this.thrownError = n);
								const { observers: r } = this;
								for (; r.length; ) r.shift().error(n);
							}
						});
					}
					complete() {
						Ro(() => {
							if ((this._throwIfClosed(), !this.isStopped)) {
								this.isStopped = !0;
								const { observers: n } = this;
								for (; n.length; ) n.shift().complete();
							}
						});
					}
					unsubscribe() {
						(this.isStopped = this.closed = !0),
							(this.observers = this.currentObservers = null);
					}
					get observed() {
						var n;
						return (
							(null === (n = this.observers) || void 0 === n
								? void 0
								: n.length) > 0
						);
					}
					_trySubscribe(n) {
						return this._throwIfClosed(), super._trySubscribe(n);
					}
					_subscribe(n) {
						return (
							this._throwIfClosed(),
							this._checkFinalizedStatuses(n),
							this._innerSubscribe(n)
						);
					}
					_innerSubscribe(n) {
						const { hasError: r, isStopped: i, observers: o } = this;
						return r || i
							? hd
							: ((this.currentObservers = null),
							  o.push(n),
							  new st(() => {
									(this.currentObservers = null), ti(o, n);
							  }));
					}
					_checkFinalizedStatuses(n) {
						const { hasError: r, thrownError: i, isStopped: o } = this;
						r ? n.error(i) : o && n.complete();
					}
					asObservable() {
						const n = new Ce();
						return (n.source = this), n;
					}
				}
				return (e.create = (t, n) => new Cd(t, n)), e;
			})();
			class Cd extends Ut {
				constructor(t, n) {
					super(), (this.destination = t), (this.source = n);
				}
				next(t) {
					var n, r;
					null ===
						(r =
							null === (n = this.destination) || void 0 === n
								? void 0
								: n.next) ||
						void 0 === r ||
						r.call(n, t);
				}
				error(t) {
					var n, r;
					null ===
						(r =
							null === (n = this.destination) || void 0 === n
								? void 0
								: n.error) ||
						void 0 === r ||
						r.call(n, t);
				}
				complete() {
					var t, n;
					null ===
						(n =
							null === (t = this.destination) || void 0 === t
								? void 0
								: t.complete) ||
						void 0 === n ||
						n.call(t);
				}
				_subscribe(t) {
					var n, r;
					return null !==
						(r =
							null === (n = this.source) || void 0 === n
								? void 0
								: n.subscribe(t)) && void 0 !== r
						? r
						: hd;
				}
			}
			function Dd(e) {
				return ie(e?.lift);
			}
			function Ie(e) {
				return (t) => {
					if (Dd(t))
						return t.lift(function (n) {
							try {
								return e(n, this);
							} catch (r) {
								this.error(r);
							}
						});
					throw new TypeError("Unable to lift unknown Observable type");
				};
			}
			function Se(e, t, n, r, i) {
				return new J_(e, t, n, r, i);
			}
			class J_ extends Pa {
				constructor(t, n, r, i, o, s) {
					super(t),
						(this.onFinalize = o),
						(this.shouldUnsubscribe = s),
						(this._next = n
							? function (a) {
									try {
										n(a);
									} catch (u) {
										t.error(u);
									}
							  }
							: super._next),
						(this._error = i
							? function (a) {
									try {
										i(a);
									} catch (u) {
										t.error(u);
									} finally {
										this.unsubscribe();
									}
							  }
							: super._error),
						(this._complete = r
							? function () {
									try {
										r();
									} catch (a) {
										t.error(a);
									} finally {
										this.unsubscribe();
									}
							  }
							: super._complete);
				}
				unsubscribe() {
					var t;
					if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
						const { closed: n } = this;
						super.unsubscribe(),
							!n &&
								(null === (t = this.onFinalize) ||
									void 0 === t ||
									t.call(this));
					}
				}
			}
			function W(e, t) {
				return Ie((n, r) => {
					let i = 0;
					n.subscribe(
						Se(r, (o) => {
							r.next(e.call(t, o, i++));
						})
					);
				});
			}
			function En(e) {
				return this instanceof En ? ((this.v = e), this) : new En(e);
			}
			function nC(e, t, n) {
				if (!Symbol.asyncIterator)
					throw new TypeError("Symbol.asyncIterator is not defined.");
				var i,
					r = n.apply(e, t || []),
					o = [];
				return (
					(i = {}),
					s("next"),
					s("throw"),
					s("return"),
					(i[Symbol.asyncIterator] = function () {
						return this;
					}),
					i
				);
				function s(f) {
					r[f] &&
						(i[f] = function (h) {
							return new Promise(function (p, g) {
								o.push([f, h, p, g]) > 1 || a(f, h);
							});
						});
				}
				function a(f, h) {
					try {
						!(function u(f) {
							f.value instanceof En
								? Promise.resolve(f.value.v).then(l, c)
								: d(o[0][2], f);
						})(r[f](h));
					} catch (p) {
						d(o[0][3], p);
					}
				}
				function l(f) {
					a("next", f);
				}
				function c(f) {
					a("throw", f);
				}
				function d(f, h) {
					f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
				}
			}
			function rC(e) {
				if (!Symbol.asyncIterator)
					throw new TypeError("Symbol.asyncIterator is not defined.");
				var n,
					t = e[Symbol.asyncIterator];
				return t
					? t.call(e)
					: ((e = (function Md(e) {
							var t = "function" == typeof Symbol && Symbol.iterator,
								n = t && e[t],
								r = 0;
							if (n) return n.call(e);
							if (e && "number" == typeof e.length)
								return {
									next: function () {
										return (
											e && r >= e.length && (e = void 0),
											{ value: e && e[r++], done: !e }
										);
									},
								};
							throw new TypeError(
								t
									? "Object is not iterable."
									: "Symbol.iterator is not defined."
							);
					  })(e)),
					  (n = {}),
					  r("next"),
					  r("throw"),
					  r("return"),
					  (n[Symbol.asyncIterator] = function () {
							return this;
					  }),
					  n);
				function r(o) {
					n[o] =
						e[o] &&
						function (s) {
							return new Promise(function (a, u) {
								!(function i(o, s, a, u) {
									Promise.resolve(u).then(function (l) {
										o({ value: l, done: a });
									}, s);
								})(a, u, (s = e[o](s)).done, s.value);
							});
						};
				}
			}
			const Ed = (e) =>
				e && "number" == typeof e.length && "function" != typeof e;
			function Id(e) {
				return ie(e?.then);
			}
			function Sd(e) {
				return ie(e[Aa]);
			}
			function Pd(e) {
				return Symbol.asyncIterator && ie(e?.[Symbol.asyncIterator]);
			}
			function Td(e) {
				return new TypeError(
					`You provided ${
						null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
					} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
				);
			}
			const Od = (function oC() {
				return "function" == typeof Symbol && Symbol.iterator
					? Symbol.iterator
					: "@@iterator";
			})();
			function Ad(e) {
				return ie(e?.[Od]);
			}
			function xd(e) {
				return nC(this, arguments, function* () {
					const n = e.getReader();
					try {
						for (;;) {
							const { value: r, done: i } = yield En(n.read());
							if (i) return yield En(void 0);
							yield yield En(r);
						}
					} finally {
						n.releaseLock();
					}
				});
			}
			function Rd(e) {
				return ie(e?.getReader);
			}
			function Pt(e) {
				if (e instanceof Ce) return e;
				if (null != e) {
					if (Sd(e))
						return (function sC(e) {
							return new Ce((t) => {
								const n = e[Aa]();
								if (ie(n.subscribe)) return n.subscribe(t);
								throw new TypeError(
									"Provided object does not correctly implement Symbol.observable"
								);
							});
						})(e);
					if (Ed(e))
						return (function aC(e) {
							return new Ce((t) => {
								for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
								t.complete();
							});
						})(e);
					if (Id(e))
						return (function uC(e) {
							return new Ce((t) => {
								e.then(
									(n) => {
										t.closed || (t.next(n), t.complete());
									},
									(n) => t.error(n)
								).then(null, md);
							});
						})(e);
					if (Pd(e)) return Nd(e);
					if (Ad(e))
						return (function lC(e) {
							return new Ce((t) => {
								for (const n of e) if ((t.next(n), t.closed)) return;
								t.complete();
							});
						})(e);
					if (Rd(e))
						return (function cC(e) {
							return Nd(xd(e));
						})(e);
				}
				throw Td(e);
			}
			function Nd(e) {
				return new Ce((t) => {
					(function dC(e, t) {
						var n, r, i, o;
						return (function eC(e, t, n, r) {
							return new (n || (n = Promise))(function (o, s) {
								function a(c) {
									try {
										l(r.next(c));
									} catch (d) {
										s(d);
									}
								}
								function u(c) {
									try {
										l(r.throw(c));
									} catch (d) {
										s(d);
									}
								}
								function l(c) {
									c.done
										? o(c.value)
										: (function i(o) {
												return o instanceof n
													? o
													: new n(function (s) {
															s(o);
													  });
										  })(c.value).then(a, u);
								}
								l((r = r.apply(e, t || [])).next());
							});
						})(this, void 0, void 0, function* () {
							try {
								for (n = rC(e); !(r = yield n.next()).done; )
									if ((t.next(r.value), t.closed)) return;
							} catch (s) {
								i = { error: s };
							} finally {
								try {
									r && !r.done && (o = n.return) && (yield o.call(n));
								} finally {
									if (i) throw i.error;
								}
							}
							t.complete();
						});
					})(e, t).catch((n) => t.error(n));
				});
			}
			function Bt(e, t, n, r = 0, i = !1) {
				const o = t.schedule(function () {
					n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
				}, r);
				if ((e.add(o), !i)) return o;
			}
			function Pe(e, t, n = 1 / 0) {
				return ie(t)
					? Pe((r, i) => W((o, s) => t(r, o, i, s))(Pt(e(r, i))), n)
					: ("number" == typeof t && (n = t),
					  Ie((r, i) =>
							(function fC(e, t, n, r, i, o, s, a) {
								const u = [];
								let l = 0,
									c = 0,
									d = !1;
								const f = () => {
										d && !u.length && !l && t.complete();
									},
									h = (g) => (l < r ? p(g) : u.push(g)),
									p = (g) => {
										o && t.next(g), l++;
										let y = !1;
										Pt(n(g, c++)).subscribe(
											Se(
												t,
												(_) => {
													i?.(_), o ? h(_) : t.next(_);
												},
												() => {
													y = !0;
												},
												void 0,
												() => {
													if (y)
														try {
															for (l--; u.length && l < r; ) {
																const _ = u.shift();
																s ? Bt(t, s, () => p(_)) : p(_);
															}
															f();
														} catch (_) {
															t.error(_);
														}
												}
											)
										);
									};
								return (
									e.subscribe(
										Se(t, h, () => {
											(d = !0), f();
										})
									),
									() => {
										a?.();
									}
								);
							})(r, i, e, n)
					  ));
			}
			function Kn(e = 1 / 0) {
				return Pe(Mn, e);
			}
			const Ht = new Ce((e) => e.complete());
			function Ra(e) {
				return e[e.length - 1];
			}
			function ri(e) {
				return (function pC(e) {
					return e && ie(e.schedule);
				})(Ra(e))
					? e.pop()
					: void 0;
			}
			function Fd(e, t = 0) {
				return Ie((n, r) => {
					n.subscribe(
						Se(
							r,
							(i) => Bt(r, e, () => r.next(i), t),
							() => Bt(r, e, () => r.complete(), t),
							(i) => Bt(r, e, () => r.error(i), t)
						)
					);
				});
			}
			function kd(e, t = 0) {
				return Ie((n, r) => {
					r.add(e.schedule(() => n.subscribe(r), t));
				});
			}
			function Ld(e, t) {
				if (!e) throw new Error("Iterable cannot be null");
				return new Ce((n) => {
					Bt(n, t, () => {
						const r = e[Symbol.asyncIterator]();
						Bt(
							n,
							t,
							() => {
								r.next().then((i) => {
									i.done ? n.complete() : n.next(i.value);
								});
							},
							0,
							!0
						);
					});
				});
			}
			function De(e, t) {
				return t
					? (function wC(e, t) {
							if (null != e) {
								if (Sd(e))
									return (function vC(e, t) {
										return Pt(e).pipe(kd(t), Fd(t));
									})(e, t);
								if (Ed(e))
									return (function _C(e, t) {
										return new Ce((n) => {
											let r = 0;
											return t.schedule(function () {
												r === e.length
													? n.complete()
													: (n.next(e[r++]), n.closed || this.schedule());
											});
										});
									})(e, t);
								if (Id(e))
									return (function yC(e, t) {
										return Pt(e).pipe(kd(t), Fd(t));
									})(e, t);
								if (Pd(e)) return Ld(e, t);
								if (Ad(e))
									return (function CC(e, t) {
										return new Ce((n) => {
											let r;
											return (
												Bt(n, t, () => {
													(r = e[Od]()),
														Bt(
															n,
															t,
															() => {
																let i, o;
																try {
																	({ value: i, done: o } = r.next());
																} catch (s) {
																	return void n.error(s);
																}
																o ? n.complete() : n.next(i);
															},
															0,
															!0
														);
												}),
												() => ie(r?.return) && r.return()
											);
										});
									})(e, t);
								if (Rd(e))
									return (function DC(e, t) {
										return Ld(xd(e), t);
									})(e, t);
							}
							throw Td(e);
					  })(e, t)
					: Pt(e);
			}
			function Na(e, t, ...n) {
				if (!0 === t) return void e();
				if (!1 === t) return;
				const r = new ni({
					next: () => {
						r.unsubscribe(), e();
					},
				});
				return t(...n).subscribe(r);
			}
			function te(e) {
				for (let t in e) if (e[t] === te) return t;
				throw Error("Could not find renamed property on target object.");
			}
			function ne(e) {
				if ("string" == typeof e) return e;
				if (Array.isArray(e)) return "[" + e.map(ne).join(", ") + "]";
				if (null == e) return "" + e;
				if (e.overriddenName) return `${e.overriddenName}`;
				if (e.name) return `${e.name}`;
				const t = e.toString();
				if (null == t) return "" + t;
				const n = t.indexOf("\n");
				return -1 === n ? t : t.substring(0, n);
			}
			function ka(e, t) {
				return null == e || "" === e
					? null === t
						? ""
						: t
					: null == t || "" === t
					? e
					: e + " " + t;
			}
			const EC = te({ __forward_ref__: te });
			function La(e) {
				return (
					(e.__forward_ref__ = La),
					(e.toString = function () {
						return ne(this());
					}),
					e
				);
			}
			function A(e) {
				return ja(e) ? e() : e;
			}
			function ja(e) {
				return (
					"function" == typeof e &&
					e.hasOwnProperty(EC) &&
					e.__forward_ref__ === La
				);
			}
			function Va(e) {
				return e && !!e.ɵproviders;
			}
			const jd = "https://g.co/ng/security#xss";
			class w extends Error {
				constructor(t, n) {
					super(
						(function Fo(e, t) {
							return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
						})(t, n)
					),
						(this.code = t);
				}
			}
			function L(e) {
				return "string" == typeof e ? e : null == e ? "" : String(e);
			}
			function ko(e, t) {
				throw new w(-201, !1);
			}
			function at(e, t) {
				null == e &&
					(function J(e, t, n, r) {
						throw new Error(
							`ASSERTION ERROR: ${e}` +
								(null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
						);
					})(t, e, null, "!=");
			}
			function k(e) {
				return {
					token: e.token,
					providedIn: e.providedIn || null,
					factory: e.factory,
					value: void 0,
				};
			}
			function Tt(e) {
				return { providers: e.providers || [], imports: e.imports || [] };
			}
			function Lo(e) {
				return Vd(e, jo) || Vd(e, Ud);
			}
			function Vd(e, t) {
				return e.hasOwnProperty(t) ? e[t] : null;
			}
			function $d(e) {
				return e && (e.hasOwnProperty($a) || e.hasOwnProperty(NC))
					? e[$a]
					: null;
			}
			const jo = te({ ɵprov: te }),
				$a = te({ ɵinj: te }),
				Ud = te({ ngInjectableDef: te }),
				NC = te({ ngInjectorDef: te });
			var x = (() => (
				((x = x || {})[(x.Default = 0)] = "Default"),
				(x[(x.Host = 1)] = "Host"),
				(x[(x.Self = 2)] = "Self"),
				(x[(x.SkipSelf = 4)] = "SkipSelf"),
				(x[(x.Optional = 8)] = "Optional"),
				x
			))();
			let Ua;
			function ut(e) {
				const t = Ua;
				return (Ua = e), t;
			}
			function Bd(e, t, n) {
				const r = Lo(e);
				return r && "root" == r.providedIn
					? void 0 === r.value
						? (r.value = r.factory())
						: r.value
					: n & x.Optional
					? null
					: void 0 !== t
					? t
					: void ko(ne(e));
			}
			const oe = (() =>
					(typeof globalThis < "u" && globalThis) ||
					(typeof global < "u" && global) ||
					(typeof window < "u" && window) ||
					(typeof self < "u" &&
						typeof WorkerGlobalScope < "u" &&
						self instanceof WorkerGlobalScope &&
						self))(),
				ii = {},
				Ba = "__NG_DI_FLAG__",
				Vo = "ngTempTokenPath",
				LC = /\n/gm,
				Hd = "__source";
			let oi;
			function Yn(e) {
				const t = oi;
				return (oi = e), t;
			}
			function VC(e, t = x.Default) {
				if (void 0 === oi) throw new w(-203, !1);
				return null === oi
					? Bd(e, void 0, t)
					: oi.get(e, t & x.Optional ? null : void 0, t);
			}
			function S(e, t = x.Default) {
				return (
					(function FC() {
						return Ua;
					})() || VC
				)(A(e), t);
			}
			function Q(e, t = x.Default) {
				return S(e, $o(t));
			}
			function $o(e) {
				return typeof e > "u" || "number" == typeof e
					? e
					: 0 |
							(e.optional && 8) |
							(e.host && 1) |
							(e.self && 2) |
							(e.skipSelf && 4);
			}
			function Ha(e) {
				const t = [];
				for (let n = 0; n < e.length; n++) {
					const r = A(e[n]);
					if (Array.isArray(r)) {
						if (0 === r.length) throw new w(900, !1);
						let i,
							o = x.Default;
						for (let s = 0; s < r.length; s++) {
							const a = r[s],
								u = $C(a);
							"number" == typeof u
								? -1 === u
									? (i = a.token)
									: (o |= u)
								: (i = a);
						}
						t.push(S(i, o));
					} else t.push(S(r));
				}
				return t;
			}
			function si(e, t) {
				return (e[Ba] = t), (e.prototype[Ba] = t), e;
			}
			function $C(e) {
				return e[Ba];
			}
			function cn(e) {
				return { toString: e }.toString();
			}
			var mt = (() => (
					((mt = mt || {})[(mt.OnPush = 0)] = "OnPush"),
					(mt[(mt.Default = 1)] = "Default"),
					mt
				))(),
				Ot = (() => {
					return (
						((e = Ot || (Ot = {}))[(e.Emulated = 0)] = "Emulated"),
						(e[(e.None = 2)] = "None"),
						(e[(e.ShadowDom = 3)] = "ShadowDom"),
						Ot
					);
					var e;
				})();
			const zt = {},
				Y = [],
				Uo = te({ ɵcmp: te }),
				za = te({ ɵdir: te }),
				qa = te({ ɵpipe: te }),
				qd = te({ ɵmod: te }),
				qt = te({ ɵfac: te }),
				ai = te({ __NG_ELEMENT_ID__: te });
			let HC = 0;
			function ue(e) {
				return cn(() => {
					const n = !0 === e.standalone,
						r = {},
						i = {
							type: e.type,
							providersResolver: null,
							decls: e.decls,
							vars: e.vars,
							factory: null,
							template: e.template || null,
							consts: e.consts || null,
							ngContentSelectors: e.ngContentSelectors,
							hostBindings: e.hostBindings || null,
							hostVars: e.hostVars || 0,
							hostAttrs: e.hostAttrs || null,
							contentQueries: e.contentQueries || null,
							declaredInputs: r,
							inputs: null,
							outputs: null,
							exportAs: e.exportAs || null,
							onPush: e.changeDetection === mt.OnPush,
							directiveDefs: null,
							pipeDefs: null,
							standalone: n,
							dependencies: (n && e.dependencies) || null,
							getStandaloneInjector: null,
							selectors: e.selectors || Y,
							viewQuery: e.viewQuery || null,
							features: e.features || null,
							data: e.data || {},
							encapsulation: e.encapsulation || Ot.Emulated,
							id: "c" + HC++,
							styles: e.styles || Y,
							_: null,
							setInput: null,
							schemas: e.schemas || null,
							tView: null,
							findHostDirectiveDefs: null,
							hostDirectives: null,
						},
						o = e.dependencies,
						s = e.features;
					return (
						(i.inputs = Qd(e.inputs, r)),
						(i.outputs = Qd(e.outputs)),
						s && s.forEach((a) => a(i)),
						(i.directiveDefs = o
							? () => ("function" == typeof o ? o() : o).map(Gd).filter(Wd)
							: null),
						(i.pipeDefs = o
							? () => ("function" == typeof o ? o() : o).map($e).filter(Wd)
							: null),
						i
					);
				});
			}
			function Gd(e) {
				return ee(e) || Re(e);
			}
			function Wd(e) {
				return null !== e;
			}
			function Gt(e) {
				return cn(() => ({
					type: e.type,
					bootstrap: e.bootstrap || Y,
					declarations: e.declarations || Y,
					imports: e.imports || Y,
					exports: e.exports || Y,
					transitiveCompileScopes: null,
					schemas: e.schemas || null,
					id: e.id || null,
				}));
			}
			function Qd(e, t) {
				if (null == e) return zt;
				const n = {};
				for (const r in e)
					if (e.hasOwnProperty(r)) {
						let i = e[r],
							o = i;
						Array.isArray(i) && ((o = i[1]), (i = i[0])),
							(n[i] = r),
							t && (t[i] = o);
					}
				return n;
			}
			const Ve = ue;
			function ee(e) {
				return e[Uo] || null;
			}
			function Re(e) {
				return e[za] || null;
			}
			function $e(e) {
				return e[qa] || null;
			}
			function et(e, t) {
				const n = e[qd] || null;
				if (!n && !0 === t)
					throw new Error(`Type ${ne(e)} does not have '\u0275mod' property.`);
				return n;
			}
			const H = 11;
			function tt(e) {
				return Array.isArray(e) && "object" == typeof e[1];
			}
			function yt(e) {
				return Array.isArray(e) && !0 === e[1];
			}
			function Qa(e) {
				return 0 != (4 & e.flags);
			}
			function di(e) {
				return e.componentOffset > -1;
			}
			function Go(e) {
				return 1 == (1 & e.flags);
			}
			function _t(e) {
				return null !== e.template;
			}
			function GC(e) {
				return 0 != (256 & e[2]);
			}
			function Sn(e, t) {
				return e.hasOwnProperty(qt) ? e[qt] : null;
			}
			class ZC {
				constructor(t, n, r) {
					(this.previousValue = t),
						(this.currentValue = n),
						(this.firstChange = r);
				}
				isFirstChange() {
					return this.firstChange;
				}
			}
			function Pn() {
				return ef;
			}
			function ef(e) {
				return e.type.prototype.ngOnChanges && (e.setInput = YC), KC;
			}
			function KC() {
				const e = nf(this),
					t = e?.current;
				if (t) {
					const n = e.previous;
					if (n === zt) e.previous = t;
					else for (let r in t) n[r] = t[r];
					(e.current = null), this.ngOnChanges(t);
				}
			}
			function YC(e, t, n, r) {
				const i = this.declaredInputs[n],
					o =
						nf(e) ||
						(function XC(e, t) {
							return (e[tf] = t);
						})(e, { previous: zt, current: null }),
					s = o.current || (o.current = {}),
					a = o.previous,
					u = a[i];
				(s[i] = new ZC(u && u.currentValue, t, a === zt)), (e[r] = t);
			}
			Pn.ngInherit = !0;
			const tf = "__ngSimpleChanges__";
			function nf(e) {
				return e[tf] || null;
			}
			function Te(e) {
				for (; Array.isArray(e); ) e = e[0];
				return e;
			}
			function nt(e, t) {
				return Te(t[e.index]);
			}
			function af(e, t) {
				return e.data[t];
			}
			function rt(e, t) {
				const n = t[e];
				return tt(n) ? n : n[0];
			}
			function Qo(e) {
				return 64 == (64 & e[2]);
			}
			function dn(e, t) {
				return null == t ? null : e[t];
			}
			function uf(e) {
				e[18] = 0;
			}
			function Ka(e, t) {
				e[5] += t;
				let n = e,
					r = e[3];
				for (
					;
					null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

				)
					(r[5] += t), (n = r), (r = r[3]);
			}
			const j = { lFrame: Cf(null), bindingsEnabled: !0 };
			function cf() {
				return j.bindingsEnabled;
			}
			function v() {
				return j.lFrame.lView;
			}
			function Z() {
				return j.lFrame.tView;
			}
			function Oe() {
				let e = hf();
				for (; null !== e && 64 === e.type; ) e = e.parent;
				return e;
			}
			function hf() {
				return j.lFrame.currentTNode;
			}
			function xt(e, t) {
				const n = j.lFrame;
				(n.currentTNode = e), (n.isParent = t);
			}
			function Ya() {
				return j.lFrame.isParent;
			}
			function Be() {
				const e = j.lFrame;
				let t = e.bindingRootIndex;
				return (
					-1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
				);
			}
			function ir() {
				return j.lFrame.bindingIndex++;
			}
			function dD(e, t) {
				const n = j.lFrame;
				(n.bindingIndex = n.bindingRootIndex = e), Ja(t);
			}
			function Ja(e) {
				j.lFrame.currentDirectiveIndex = e;
			}
			function vf() {
				return j.lFrame.currentQueryIndex;
			}
			function tu(e) {
				j.lFrame.currentQueryIndex = e;
			}
			function hD(e) {
				const t = e[1];
				return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
			}
			function yf(e, t, n) {
				if (n & x.SkipSelf) {
					let i = t,
						o = e;
					for (
						;
						!((i = i.parent),
						null !== i ||
							n & x.Host ||
							((i = hD(o)), null === i || ((o = o[15]), 10 & i.type)));

					);
					if (null === i) return !1;
					(t = i), (e = o);
				}
				const r = (j.lFrame = _f());
				return (r.currentTNode = t), (r.lView = e), !0;
			}
			function nu(e) {
				const t = _f(),
					n = e[1];
				(j.lFrame = t),
					(t.currentTNode = n.firstChild),
					(t.lView = e),
					(t.tView = n),
					(t.contextLView = e),
					(t.bindingIndex = n.bindingStartIndex),
					(t.inI18n = !1);
			}
			function _f() {
				const e = j.lFrame,
					t = null === e ? null : e.child;
				return null === t ? Cf(e) : t;
			}
			function Cf(e) {
				const t = {
					currentTNode: null,
					isParent: !0,
					lView: null,
					tView: null,
					selectedIndex: -1,
					contextLView: null,
					elementDepthCount: 0,
					currentNamespace: null,
					currentDirectiveIndex: -1,
					bindingRootIndex: -1,
					bindingIndex: -1,
					currentQueryIndex: 0,
					parent: e,
					child: null,
					inI18n: !1,
				};
				return null !== e && (e.child = t), t;
			}
			function Df() {
				const e = j.lFrame;
				return (
					(j.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
				);
			}
			const wf = Df;
			function ru() {
				const e = Df();
				(e.isParent = !0),
					(e.tView = null),
					(e.selectedIndex = -1),
					(e.contextLView = null),
					(e.elementDepthCount = 0),
					(e.currentDirectiveIndex = -1),
					(e.currentNamespace = null),
					(e.bindingRootIndex = -1),
					(e.bindingIndex = -1),
					(e.currentQueryIndex = 0);
			}
			function He() {
				return j.lFrame.selectedIndex;
			}
			function Tn(e) {
				j.lFrame.selectedIndex = e;
			}
			function le() {
				const e = j.lFrame;
				return af(e.tView, e.selectedIndex);
			}
			function Zo(e, t) {
				for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
					const o = e.data[n].type.prototype,
						{
							ngAfterContentInit: s,
							ngAfterContentChecked: a,
							ngAfterViewInit: u,
							ngAfterViewChecked: l,
							ngOnDestroy: c,
						} = o;
					s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
						a &&
							((e.contentHooks || (e.contentHooks = [])).push(n, a),
							(e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
						u && (e.viewHooks || (e.viewHooks = [])).push(-n, u),
						l &&
							((e.viewHooks || (e.viewHooks = [])).push(n, l),
							(e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, l)),
						null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
				}
			}
			function Ko(e, t, n) {
				bf(e, t, 3, n);
			}
			function Yo(e, t, n, r) {
				(3 & e[2]) === n && bf(e, t, n, r);
			}
			function iu(e, t) {
				let n = e[2];
				(3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
			}
			function bf(e, t, n, r) {
				const o = r ?? -1,
					s = t.length - 1;
				let a = 0;
				for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++)
					if ("number" == typeof t[u + 1]) {
						if (((a = t[u]), null != r && a >= r)) break;
					} else
						t[u] < 0 && (e[18] += 65536),
							(a < o || -1 == o) &&
								(wD(e, n, t, u), (e[18] = (4294901760 & e[18]) + u + 2)),
							u++;
			}
			function wD(e, t, n, r) {
				const i = n[r] < 0,
					o = n[r + 1],
					a = e[i ? -n[r] : n[r]];
				if (i) {
					if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
						e[2] += 2048;
						try {
							o.call(a);
						} finally {
						}
					}
				} else
					try {
						o.call(a);
					} finally {
					}
			}
			class hi {
				constructor(t, n, r) {
					(this.factory = t),
						(this.resolving = !1),
						(this.canSeeViewProviders = n),
						(this.injectImpl = r);
				}
			}
			function su(e, t, n) {
				let r = 0;
				for (; r < n.length; ) {
					const i = n[r];
					if ("number" == typeof i) {
						if (0 !== i) break;
						r++;
						const o = n[r++],
							s = n[r++],
							a = n[r++];
						e.setAttribute(t, s, a, o);
					} else {
						const o = i,
							s = n[++r];
						Ef(o) ? e.setProperty(t, o, s) : e.setAttribute(t, o, s), r++;
					}
				}
				return r;
			}
			function Mf(e) {
				return 3 === e || 4 === e || 6 === e;
			}
			function Ef(e) {
				return 64 === e.charCodeAt(0);
			}
			function pi(e, t) {
				if (null !== t && 0 !== t.length)
					if (null === e || 0 === e.length) e = t.slice();
					else {
						let n = -1;
						for (let r = 0; r < t.length; r++) {
							const i = t[r];
							"number" == typeof i
								? (n = i)
								: 0 === n ||
								  If(e, n, i, null, -1 === n || 2 === n ? t[++r] : null);
						}
					}
				return e;
			}
			function If(e, t, n, r, i) {
				let o = 0,
					s = e.length;
				if (-1 === t) s = -1;
				else
					for (; o < e.length; ) {
						const a = e[o++];
						if ("number" == typeof a) {
							if (a === t) {
								s = -1;
								break;
							}
							if (a > t) {
								s = o - 1;
								break;
							}
						}
					}
				for (; o < e.length; ) {
					const a = e[o];
					if ("number" == typeof a) break;
					if (a === n) {
						if (null === r) return void (null !== i && (e[o + 1] = i));
						if (r === e[o + 1]) return void (e[o + 2] = i);
					}
					o++, null !== r && o++, null !== i && o++;
				}
				-1 !== s && (e.splice(s, 0, t), (o = s + 1)),
					e.splice(o++, 0, n),
					null !== r && e.splice(o++, 0, r),
					null !== i && e.splice(o++, 0, i);
			}
			function Sf(e) {
				return -1 !== e;
			}
			function Xo(e) {
				return 32767 & e;
			}
			function Jo(e, t) {
				let n = (function ID(e) {
						return e >> 16;
					})(e),
					r = t;
				for (; n > 0; ) (r = r[15]), n--;
				return r;
			}
			let au = !0;
			function es(e) {
				const t = au;
				return (au = e), t;
			}
			let SD = 0;
			const Rt = {};
			function ts(e, t) {
				const n = Of(e, t);
				if (-1 !== n) return n;
				const r = t[1];
				r.firstCreatePass &&
					((e.injectorIndex = t.length),
					uu(r.data, e),
					uu(t, null),
					uu(r.blueprint, null));
				const i = lu(e, t),
					o = e.injectorIndex;
				if (Sf(i)) {
					const s = Xo(i),
						a = Jo(i, t),
						u = a[1].data;
					for (let l = 0; l < 8; l++) t[o + l] = a[s + l] | u[s + l];
				}
				return (t[o + 8] = i), o;
			}
			function uu(e, t) {
				e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
			}
			function Of(e, t) {
				return -1 === e.injectorIndex ||
					(e.parent && e.parent.injectorIndex === e.injectorIndex) ||
					null === t[e.injectorIndex + 8]
					? -1
					: e.injectorIndex;
			}
			function lu(e, t) {
				if (e.parent && -1 !== e.parent.injectorIndex)
					return e.parent.injectorIndex;
				let n = 0,
					r = null,
					i = t;
				for (; null !== i; ) {
					if (((r = jf(i)), null === r)) return -1;
					if ((n++, (i = i[15]), -1 !== r.injectorIndex))
						return r.injectorIndex | (n << 16);
				}
				return -1;
			}
			function cu(e, t, n) {
				!(function PD(e, t, n) {
					let r;
					"string" == typeof n
						? (r = n.charCodeAt(0) || 0)
						: n.hasOwnProperty(ai) && (r = n[ai]),
						null == r && (r = n[ai] = SD++);
					const i = 255 & r;
					t.data[e + (i >> 5)] |= 1 << i;
				})(e, t, n);
			}
			function Af(e, t, n) {
				if (n & x.Optional || void 0 !== e) return e;
				ko();
			}
			function xf(e, t, n, r) {
				if (
					(n & x.Optional && void 0 === r && (r = null),
					0 == (n & (x.Self | x.Host)))
				) {
					const i = e[9],
						o = ut(void 0);
					try {
						return i ? i.get(t, r, n & x.Optional) : Bd(t, r, n & x.Optional);
					} finally {
						ut(o);
					}
				}
				return Af(r, 0, n);
			}
			function Rf(e, t, n, r = x.Default, i) {
				if (null !== e) {
					if (1024 & t[2]) {
						const s = (function RD(e, t, n, r, i) {
							let o = e,
								s = t;
							for (
								;
								null !== o && null !== s && 1024 & s[2] && !(256 & s[2]);

							) {
								const a = Nf(o, s, n, r | x.Self, Rt);
								if (a !== Rt) return a;
								let u = o.parent;
								if (!u) {
									const l = s[21];
									if (l) {
										const c = l.get(n, Rt, r);
										if (c !== Rt) return c;
									}
									(u = jf(s)), (s = s[15]);
								}
								o = u;
							}
							return i;
						})(e, t, n, r, Rt);
						if (s !== Rt) return s;
					}
					const o = Nf(e, t, n, r, Rt);
					if (o !== Rt) return o;
				}
				return xf(t, n, r, i);
			}
			function Nf(e, t, n, r, i) {
				const o = (function AD(e) {
					if ("string" == typeof e) return e.charCodeAt(0) || 0;
					const t = e.hasOwnProperty(ai) ? e[ai] : void 0;
					return "number" == typeof t ? (t >= 0 ? 255 & t : xD) : t;
				})(n);
				if ("function" == typeof o) {
					if (!yf(t, e, r)) return r & x.Host ? Af(i, 0, r) : xf(t, n, r, i);
					try {
						const s = o(r);
						if (null != s || r & x.Optional) return s;
						ko();
					} finally {
						wf();
					}
				} else if ("number" == typeof o) {
					let s = null,
						a = Of(e, t),
						u = -1,
						l = r & x.Host ? t[16][6] : null;
					for (
						(-1 === a || r & x.SkipSelf) &&
						((u = -1 === a ? lu(e, t) : t[a + 8]),
						-1 !== u && kf(r, !1)
							? ((s = t[1]), (a = Xo(u)), (t = Jo(u, t)))
							: (a = -1));
						-1 !== a;

					) {
						const c = t[1];
						if (Ff(o, a, c.data)) {
							const d = OD(a, t, n, s, r, l);
							if (d !== Rt) return d;
						}
						(u = t[a + 8]),
							-1 !== u && kf(r, t[1].data[a + 8] === l) && Ff(o, a, t)
								? ((s = c), (a = Xo(u)), (t = Jo(u, t)))
								: (a = -1);
					}
				}
				return i;
			}
			function OD(e, t, n, r, i, o) {
				const s = t[1],
					a = s.data[e + 8],
					c = ns(
						a,
						s,
						n,
						null == r ? di(a) && au : r != s && 0 != (3 & a.type),
						i & x.Host && o === a
					);
				return null !== c ? On(t, s, c, a) : Rt;
			}
			function ns(e, t, n, r, i) {
				const o = e.providerIndexes,
					s = t.data,
					a = 1048575 & o,
					u = e.directiveStart,
					c = o >> 20,
					f = i ? a + c : e.directiveEnd;
				for (let h = r ? a : a + c; h < f; h++) {
					const p = s[h];
					if ((h < u && n === p) || (h >= u && p.type === n)) return h;
				}
				if (i) {
					const h = s[u];
					if (h && _t(h) && h.type === n) return u;
				}
				return null;
			}
			function On(e, t, n, r) {
				let i = e[n];
				const o = t.data;
				if (
					(function bD(e) {
						return e instanceof hi;
					})(i)
				) {
					const s = i;
					s.resolving &&
						(function IC(e, t) {
							const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
							throw new w(
								-200,
								`Circular dependency in DI detected for ${e}${n}`
							);
						})(
							(function X(e) {
								return "function" == typeof e
									? e.name || e.toString()
									: "object" == typeof e &&
									  null != e &&
									  "function" == typeof e.type
									? e.type.name || e.type.toString()
									: L(e);
							})(o[n])
						);
					const a = es(s.canSeeViewProviders);
					s.resolving = !0;
					const u = s.injectImpl ? ut(s.injectImpl) : null;
					yf(e, r, x.Default);
					try {
						(i = e[n] = s.factory(void 0, o, e, r)),
							t.firstCreatePass &&
								n >= r.directiveStart &&
								(function DD(e, t, n) {
									const {
										ngOnChanges: r,
										ngOnInit: i,
										ngDoCheck: o,
									} = t.type.prototype;
									if (r) {
										const s = ef(t);
										(n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
											(
												n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
											).push(e, s);
									}
									i &&
										(n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, i),
										o &&
											((n.preOrderHooks || (n.preOrderHooks = [])).push(e, o),
											(
												n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
											).push(e, o));
								})(n, o[n], t);
					} finally {
						null !== u && ut(u), es(a), (s.resolving = !1), wf();
					}
				}
				return i;
			}
			function Ff(e, t, n) {
				return !!(n[t + (e >> 5)] & (1 << e));
			}
			function kf(e, t) {
				return !(e & x.Self || (e & x.Host && t));
			}
			class sr {
				constructor(t, n) {
					(this._tNode = t), (this._lView = n);
				}
				get(t, n, r) {
					return Rf(this._tNode, this._lView, t, $o(r), n);
				}
			}
			function xD() {
				return new sr(Oe(), v());
			}
			function du(e) {
				return ja(e)
					? () => {
							const t = du(A(e));
							return t && t();
					  }
					: Sn(e);
			}
			function jf(e) {
				const t = e[1],
					n = t.type;
				return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
			}
			const ur = "__parameters__";
			function cr(e, t, n) {
				return cn(() => {
					const r = (function fu(e) {
						return function (...n) {
							if (e) {
								const r = e(...n);
								for (const i in r) this[i] = r[i];
							}
						};
					})(t);
					function i(...o) {
						if (this instanceof i) return r.apply(this, o), this;
						const s = new i(...o);
						return (a.annotation = s), a;
						function a(u, l, c) {
							const d = u.hasOwnProperty(ur)
								? u[ur]
								: Object.defineProperty(u, ur, { value: [] })[ur];
							for (; d.length <= c; ) d.push(null);
							return (d[c] = d[c] || []).push(s), u;
						}
					}
					return (
						n && (i.prototype = Object.create(n.prototype)),
						(i.prototype.ngMetadataName = e),
						(i.annotationCls = i),
						i
					);
				});
			}
			class F {
				constructor(t, n) {
					(this._desc = t),
						(this.ngMetadataName = "InjectionToken"),
						(this.ɵprov = void 0),
						"number" == typeof n
							? (this.__NG_ELEMENT_ID__ = n)
							: void 0 !== n &&
							  (this.ɵprov = k({
									token: this,
									providedIn: n.providedIn || "root",
									factory: n.factory,
							  }));
				}
				get multi() {
					return this;
				}
				toString() {
					return `InjectionToken ${this._desc}`;
				}
			}
			function An(e, t) {
				e.forEach((n) => (Array.isArray(n) ? An(n, t) : t(n)));
			}
			function $f(e, t, n) {
				t >= e.length ? e.push(n) : e.splice(t, 0, n);
			}
			function is(e, t) {
				return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
			}
			const yi = si(cr("Optional"), 8),
				_i = si(cr("SkipSelf"), 4);
			var Qe = (() => (
				((Qe = Qe || {})[(Qe.Important = 1)] = "Important"),
				(Qe[(Qe.DashCase = 2)] = "DashCase"),
				Qe
			))();
			const Cu = new Map();
			let ow = 0;
			const wu = "__ngContext__";
			function ke(e, t) {
				tt(t)
					? ((e[wu] = t[20]),
					  (function aw(e) {
							Cu.set(e[20], e);
					  })(t))
					: (e[wu] = t);
			}
			function Mu(e, t) {
				return undefined(e, t);
			}
			function bi(e) {
				const t = e[3];
				return yt(t) ? t[3] : t;
			}
			function Eu(e) {
				return ah(e[13]);
			}
			function Iu(e) {
				return ah(e[4]);
			}
			function ah(e) {
				for (; null !== e && !yt(e); ) e = e[4];
				return e;
			}
			function hr(e, t, n, r, i) {
				if (null != r) {
					let o,
						s = !1;
					yt(r) ? (o = r) : tt(r) && ((s = !0), (r = r[0]));
					const a = Te(r);
					0 === e && null !== n
						? null == i
							? hh(t, n, a)
							: xn(t, n, a, i || null, !0)
						: 1 === e && null !== n
						? xn(t, n, a, i || null, !0)
						: 2 === e
						? (function Ru(e, t, n) {
								const r = us(e, t);
								r &&
									(function Sw(e, t, n, r) {
										e.removeChild(t, n, r);
									})(e, r, t, n);
						  })(t, a, s)
						: 3 === e && t.destroyNode(a),
						null != o &&
							(function Ow(e, t, n, r, i) {
								const o = n[7];
								o !== Te(n) && hr(t, e, r, o, i);
								for (let a = 10; a < n.length; a++) {
									const u = n[a];
									Mi(u[1], u, e, t, r, o);
								}
							})(t, e, o, n, i);
				}
			}
			function Pu(e, t, n) {
				return e.createElement(t, n);
			}
			function lh(e, t) {
				const n = e[9],
					r = n.indexOf(t),
					i = t[3];
				512 & t[2] && ((t[2] &= -513), Ka(i, -1)), n.splice(r, 1);
			}
			function Tu(e, t) {
				if (e.length <= 10) return;
				const n = 10 + t,
					r = e[n];
				if (r) {
					const i = r[17];
					null !== i && i !== e && lh(i, r), t > 0 && (e[n - 1][4] = r[4]);
					const o = is(e, 10 + t);
					!(function _w(e, t) {
						Mi(e, t, t[H], 2, null, null), (t[0] = null), (t[6] = null);
					})(r[1], r);
					const s = o[19];
					null !== s && s.detachView(o[1]),
						(r[3] = null),
						(r[4] = null),
						(r[2] &= -65);
				}
				return r;
			}
			function ch(e, t) {
				if (!(128 & t[2])) {
					const n = t[H];
					n.destroyNode && Mi(e, t, n, 3, null, null),
						(function ww(e) {
							let t = e[13];
							if (!t) return Ou(e[1], e);
							for (; t; ) {
								let n = null;
								if (tt(t)) n = t[13];
								else {
									const r = t[10];
									r && (n = r);
								}
								if (!n) {
									for (; t && !t[4] && t !== e; )
										tt(t) && Ou(t[1], t), (t = t[3]);
									null === t && (t = e), tt(t) && Ou(t[1], t), (n = t && t[4]);
								}
								t = n;
							}
						})(t);
				}
			}
			function Ou(e, t) {
				if (!(128 & t[2])) {
					(t[2] &= -65),
						(t[2] |= 128),
						(function Iw(e, t) {
							let n;
							if (null != e && null != (n = e.destroyHooks))
								for (let r = 0; r < n.length; r += 2) {
									const i = t[n[r]];
									if (!(i instanceof hi)) {
										const o = n[r + 1];
										if (Array.isArray(o))
											for (let s = 0; s < o.length; s += 2) {
												const a = i[o[s]],
													u = o[s + 1];
												try {
													u.call(a);
												} finally {
												}
											}
										else
											try {
												o.call(i);
											} finally {
											}
									}
								}
						})(e, t),
						(function Ew(e, t) {
							const n = e.cleanup,
								r = t[7];
							let i = -1;
							if (null !== n)
								for (let o = 0; o < n.length - 1; o += 2)
									if ("string" == typeof n[o]) {
										const s = n[o + 3];
										s >= 0 ? r[(i = s)]() : r[(i = -s)].unsubscribe(), (o += 2);
									} else {
										const s = r[(i = n[o + 1])];
										n[o].call(s);
									}
							if (null !== r) {
								for (let o = i + 1; o < r.length; o++) (0, r[o])();
								t[7] = null;
							}
						})(e, t),
						1 === t[1].type && t[H].destroy();
					const n = t[17];
					if (null !== n && yt(t[3])) {
						n !== t[3] && lh(n, t);
						const r = t[19];
						null !== r && r.detachView(e);
					}
					!(function uw(e) {
						Cu.delete(e[20]);
					})(t);
				}
			}
			function dh(e, t, n) {
				return (function fh(e, t, n) {
					let r = t;
					for (; null !== r && 40 & r.type; ) r = (t = r).parent;
					if (null === r) return n[0];
					{
						const { componentOffset: i } = r;
						if (i > -1) {
							const { encapsulation: o } = e.data[r.directiveStart + i];
							if (o === Ot.None || o === Ot.Emulated) return null;
						}
						return nt(r, n);
					}
				})(e, t.parent, n);
			}
			function xn(e, t, n, r, i) {
				e.insertBefore(t, n, r, i);
			}
			function hh(e, t, n) {
				e.appendChild(t, n);
			}
			function ph(e, t, n, r, i) {
				null !== r ? xn(e, t, n, r, i) : hh(e, t, n);
			}
			function us(e, t) {
				return e.parentNode(t);
			}
			let ku,
				fs,
				vh = function mh(e, t, n) {
					return 40 & e.type ? nt(e, n) : null;
				};
			function ls(e, t, n, r) {
				const i = dh(e, r, t),
					o = t[H],
					a = (function gh(e, t, n) {
						return vh(e, t, n);
					})(r.parent || t[6], r, t);
				if (null != i)
					if (Array.isArray(n))
						for (let u = 0; u < n.length; u++) ph(o, i, n[u], a, !1);
					else ph(o, i, n, a, !1);
			}
			function cs(e, t) {
				if (null !== t) {
					const n = t.type;
					if (3 & n) return nt(t, e);
					if (4 & n) return xu(-1, e[t.index]);
					if (8 & n) {
						const r = t.child;
						if (null !== r) return cs(e, r);
						{
							const i = e[t.index];
							return yt(i) ? xu(-1, i) : Te(i);
						}
					}
					if (32 & n) return Mu(t, e)() || Te(e[t.index]);
					{
						const r = _h(e, t);
						return null !== r
							? Array.isArray(r)
								? r[0]
								: cs(bi(e[16]), r)
							: cs(e, t.next);
					}
				}
				return null;
			}
			function _h(e, t) {
				return null !== t ? e[16][6].projection[t.projection] : null;
			}
			function xu(e, t) {
				const n = 10 + e + 1;
				if (n < t.length) {
					const r = t[n],
						i = r[1].firstChild;
					if (null !== i) return cs(r, i);
				}
				return t[7];
			}
			function Nu(e, t, n, r, i, o, s) {
				for (; null != n; ) {
					const a = r[n.index],
						u = n.type;
					if (
						(s && 0 === t && (a && ke(Te(a), r), (n.flags |= 2)),
						32 != (32 & n.flags))
					)
						if (8 & u) Nu(e, t, n.child, r, i, o, !1), hr(t, e, i, a, o);
						else if (32 & u) {
							const l = Mu(n, r);
							let c;
							for (; (c = l()); ) hr(t, e, i, c, o);
							hr(t, e, i, a, o);
						} else 16 & u ? Ch(e, t, r, n, i, o) : hr(t, e, i, a, o);
					n = s ? n.projectionNext : n.next;
				}
			}
			function Mi(e, t, n, r, i, o) {
				Nu(n, r, e.firstChild, t, i, o, !1);
			}
			function Ch(e, t, n, r, i, o) {
				const s = n[16],
					u = s[6].projection[r.projection];
				if (Array.isArray(u))
					for (let l = 0; l < u.length; l++) hr(t, e, i, u[l], o);
				else Nu(e, t, u, s[3], i, o, !0);
			}
			function Dh(e, t, n) {
				"" === n
					? e.removeAttribute(t, "class")
					: e.setAttribute(t, "class", n);
			}
			function wh(e, t, n) {
				const { mergedAttrs: r, classes: i, styles: o } = n;
				null !== r && su(e, t, r),
					null !== i && Dh(e, t, i),
					null !== o &&
						(function xw(e, t, n) {
							e.setAttribute(t, "style", n);
						})(e, t, o);
			}
			function Ih(e) {
				return (
					(function Lu() {
						if (void 0 === fs && ((fs = null), oe.trustedTypes))
							try {
								fs = oe.trustedTypes.createPolicy("angular#unsafe-bypass", {
									createHTML: (e) => e,
									createScript: (e) => e,
									createScriptURL: (e) => e,
								});
							} catch {}
						return fs;
					})()?.createScriptURL(e) || e
				);
			}
			class Sh {
				constructor(t) {
					this.changingThisBreaksApplicationSecurity = t;
				}
				toString() {
					return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${jd})`;
				}
			}
			function fn(e) {
				return e instanceof Sh ? e.changingThisBreaksApplicationSecurity : e;
			}
			function Ei(e, t) {
				const n = (function Bw(e) {
					return (e instanceof Sh && e.getTypeName()) || null;
				})(e);
				if (null != n && n !== t) {
					if ("ResourceURL" === n && "URL" === t) return !0;
					throw new Error(`Required a safe ${t}, got a ${n} (see ${jd})`);
				}
				return n === t;
			}
			const Gw =
				/^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
			var me = (() => (
				((me = me || {})[(me.NONE = 0)] = "NONE"),
				(me[(me.HTML = 1)] = "HTML"),
				(me[(me.STYLE = 2)] = "STYLE"),
				(me[(me.SCRIPT = 3)] = "SCRIPT"),
				(me[(me.URL = 4)] = "URL"),
				(me[(me.RESOURCE_URL = 5)] = "RESOURCE_URL"),
				me
			))();
			function pr(e) {
				const t = Si();
				return t
					? t.sanitize(me.URL, e) || ""
					: Ei(e, "URL")
					? fn(e)
					: (function ju(e) {
							return (e = String(e)).match(Gw) ? e : "unsafe:" + e;
					  })(L(e));
			}
			function Nh(e) {
				const t = Si();
				if (t) return Ih(t.sanitize(me.RESOURCE_URL, e) || "");
				if (Ei(e, "ResourceURL")) return Ih(fn(e));
				throw new w(904, !1);
			}
			function Si() {
				const e = v();
				return e && e[12];
			}
			const ps = new F("ENVIRONMENT_INITIALIZER"),
				kh = new F("INJECTOR", -1),
				Lh = new F("INJECTOR_DEF_TYPES");
			class jh {
				get(t, n = ii) {
					if (n === ii) {
						const r = new Error(`NullInjectorError: No provider for ${ne(t)}!`);
						throw ((r.name = "NullInjectorError"), r);
					}
					return n;
				}
			}
			function ob(...e) {
				return { ɵproviders: Vh(0, e), ɵfromNgModule: !0 };
			}
			function Vh(e, ...t) {
				const n = [],
					r = new Set();
				let i;
				return (
					An(t, (o) => {
						const s = o;
						Bu(s, n, [], r) && (i || (i = []), i.push(s));
					}),
					void 0 !== i && $h(i, n),
					n
				);
			}
			function $h(e, t) {
				for (let n = 0; n < e.length; n++) {
					const { providers: i } = e[n];
					Hu(i, (o) => {
						t.push(o);
					});
				}
			}
			function Bu(e, t, n, r) {
				if (!(e = A(e))) return !1;
				let i = null,
					o = $d(e);
				const s = !o && ee(e);
				if (o || s) {
					if (s && !s.standalone) return !1;
					i = e;
				} else {
					const u = e.ngModule;
					if (((o = $d(u)), !o)) return !1;
					i = u;
				}
				const a = r.has(i);
				if (s) {
					if (a) return !1;
					if ((r.add(i), s.dependencies)) {
						const u =
							"function" == typeof s.dependencies
								? s.dependencies()
								: s.dependencies;
						for (const l of u) Bu(l, t, n, r);
					}
				} else {
					if (!o) return !1;
					{
						if (null != o.imports && !a) {
							let l;
							r.add(i);
							try {
								An(o.imports, (c) => {
									Bu(c, t, n, r) && (l || (l = []), l.push(c));
								});
							} finally {
							}
							void 0 !== l && $h(l, t);
						}
						if (!a) {
							const l = Sn(i) || (() => new i());
							t.push(
								{ provide: i, useFactory: l, deps: Y },
								{ provide: Lh, useValue: i, multi: !0 },
								{ provide: ps, useValue: () => S(i), multi: !0 }
							);
						}
						const u = o.providers;
						null == u ||
							a ||
							Hu(u, (c) => {
								t.push(c);
							});
					}
				}
				return i !== e && void 0 !== e.providers;
			}
			function Hu(e, t) {
				for (let n of e)
					Va(n) && (n = n.ɵproviders), Array.isArray(n) ? Hu(n, t) : t(n);
			}
			const sb = te({ provide: String, useValue: te });
			function zu(e) {
				return null !== e && "object" == typeof e && sb in e;
			}
			function Nn(e) {
				return "function" == typeof e;
			}
			const qu = new F("Set Injector scope."),
				gs = {},
				ub = {};
			let Gu;
			function ms() {
				return void 0 === Gu && (Gu = new jh()), Gu;
			}
			class Yt {}
			class Hh extends Yt {
				constructor(t, n, r, i) {
					super(),
						(this.parent = n),
						(this.source = r),
						(this.scopes = i),
						(this.records = new Map()),
						(this._ngOnDestroyHooks = new Set()),
						(this._onDestroyHooks = []),
						(this._destroyed = !1),
						Qu(t, (s) => this.processProvider(s)),
						this.records.set(kh, gr(void 0, this)),
						i.has("environment") && this.records.set(Yt, gr(void 0, this));
					const o = this.records.get(qu);
					null != o && "string" == typeof o.value && this.scopes.add(o.value),
						(this.injectorDefTypes = new Set(this.get(Lh.multi, Y, x.Self)));
				}
				get destroyed() {
					return this._destroyed;
				}
				destroy() {
					this.assertNotDestroyed(), (this._destroyed = !0);
					try {
						for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
						for (const t of this._onDestroyHooks) t();
					} finally {
						this.records.clear(),
							this._ngOnDestroyHooks.clear(),
							this.injectorDefTypes.clear(),
							(this._onDestroyHooks.length = 0);
					}
				}
				onDestroy(t) {
					this._onDestroyHooks.push(t);
				}
				runInContext(t) {
					this.assertNotDestroyed();
					const n = Yn(this),
						r = ut(void 0);
					try {
						return t();
					} finally {
						Yn(n), ut(r);
					}
				}
				get(t, n = ii, r = x.Default) {
					this.assertNotDestroyed(), (r = $o(r));
					const i = Yn(this),
						o = ut(void 0);
					try {
						if (!(r & x.SkipSelf)) {
							let a = this.records.get(t);
							if (void 0 === a) {
								const u =
									(function hb(e) {
										return (
											"function" == typeof e ||
											("object" == typeof e && e instanceof F)
										);
									})(t) && Lo(t);
								(a = u && this.injectableDefInScope(u) ? gr(Wu(t), gs) : null),
									this.records.set(t, a);
							}
							if (null != a) return this.hydrate(t, a);
						}
						return (r & x.Self ? ms() : this.parent).get(
							t,
							(n = r & x.Optional && n === ii ? null : n)
						);
					} catch (s) {
						if ("NullInjectorError" === s.name) {
							if (((s[Vo] = s[Vo] || []).unshift(ne(t)), i)) throw s;
							return (function UC(e, t, n, r) {
								const i = e[Vo];
								throw (
									(t[Hd] && i.unshift(t[Hd]),
									(e.message = (function BC(e, t, n, r = null) {
										e =
											e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
												? e.slice(2)
												: e;
										let i = ne(t);
										if (Array.isArray(t)) i = t.map(ne).join(" -> ");
										else if ("object" == typeof t) {
											let o = [];
											for (let s in t)
												if (t.hasOwnProperty(s)) {
													let a = t[s];
													o.push(
														s +
															":" +
															("string" == typeof a ? JSON.stringify(a) : ne(a))
													);
												}
											i = `{${o.join(", ")}}`;
										}
										return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${e.replace(
											LC,
											"\n  "
										)}`;
									})("\n" + e.message, i, n, r)),
									(e.ngTokenPath = i),
									(e[Vo] = null),
									e)
								);
							})(s, t, "R3InjectorError", this.source);
						}
						throw s;
					} finally {
						ut(o), Yn(i);
					}
				}
				resolveInjectorInitializers() {
					const t = Yn(this),
						n = ut(void 0);
					try {
						const r = this.get(ps.multi, Y, x.Self);
						for (const i of r) i();
					} finally {
						Yn(t), ut(n);
					}
				}
				toString() {
					const t = [],
						n = this.records;
					for (const r of n.keys()) t.push(ne(r));
					return `R3Injector[${t.join(", ")}]`;
				}
				assertNotDestroyed() {
					if (this._destroyed) throw new w(205, !1);
				}
				processProvider(t) {
					let n = Nn((t = A(t))) ? t : A(t && t.provide);
					const r = (function cb(e) {
						return zu(e)
							? gr(void 0, e.useValue)
							: gr(
									(function zh(e, t, n) {
										let r;
										if (Nn(e)) {
											const i = A(e);
											return Sn(i) || Wu(i);
										}
										if (zu(e)) r = () => A(e.useValue);
										else if (
											(function Bh(e) {
												return !(!e || !e.useFactory);
											})(e)
										)
											r = () => e.useFactory(...Ha(e.deps || []));
										else if (
											(function Uh(e) {
												return !(!e || !e.useExisting);
											})(e)
										)
											r = () => S(A(e.useExisting));
										else {
											const i = A(e && (e.useClass || e.provide));
											if (
												!(function db(e) {
													return !!e.deps;
												})(e)
											)
												return Sn(i) || Wu(i);
											r = () => new i(...Ha(e.deps));
										}
										return r;
									})(e),
									gs
							  );
					})(t);
					if (Nn(t) || !0 !== t.multi) this.records.get(n);
					else {
						let i = this.records.get(n);
						i ||
							((i = gr(void 0, gs, !0)),
							(i.factory = () => Ha(i.multi)),
							this.records.set(n, i)),
							(n = t),
							i.multi.push(t);
					}
					this.records.set(n, r);
				}
				hydrate(t, n) {
					return (
						n.value === gs && ((n.value = ub), (n.value = n.factory())),
						"object" == typeof n.value &&
							n.value &&
							(function fb(e) {
								return (
									null !== e &&
									"object" == typeof e &&
									"function" == typeof e.ngOnDestroy
								);
							})(n.value) &&
							this._ngOnDestroyHooks.add(n.value),
						n.value
					);
				}
				injectableDefInScope(t) {
					if (!t.providedIn) return !1;
					const n = A(t.providedIn);
					return "string" == typeof n
						? "any" === n || this.scopes.has(n)
						: this.injectorDefTypes.has(n);
				}
			}
			function Wu(e) {
				const t = Lo(e),
					n = null !== t ? t.factory : Sn(e);
				if (null !== n) return n;
				if (e instanceof F) throw new w(204, !1);
				if (e instanceof Function)
					return (function lb(e) {
						const t = e.length;
						if (t > 0)
							throw (
								((function vi(e, t) {
									const n = [];
									for (let r = 0; r < e; r++) n.push(t);
									return n;
								})(t, "?"),
								new w(204, !1))
							);
						const n = (function xC(e) {
							const t = e && (e[jo] || e[Ud]);
							if (t) {
								const n = (function RC(e) {
									if (e.hasOwnProperty("name")) return e.name;
									const t = ("" + e).match(/^function\s*([^\s(]+)/);
									return null === t ? "" : t[1];
								})(e);
								return (
									console.warn(
										`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
									),
									t
								);
							}
							return null;
						})(e);
						return null !== n ? () => n.factory(e) : () => new e();
					})(e);
				throw new w(204, !1);
			}
			function gr(e, t, n = !1) {
				return { factory: e, value: t, multi: n ? [] : void 0 };
			}
			function Qu(e, t) {
				for (const n of e)
					Array.isArray(n) ? Qu(n, t) : n && Va(n) ? Qu(n.ɵproviders, t) : t(n);
			}
			class pb {}
			class qh {}
			class mb {
				resolveComponentFactory(t) {
					throw (function gb(e) {
						const t = Error(
							`No component factory found for ${ne(
								e
							)}. Did you add it to @NgModule.entryComponents?`
						);
						return (t.ngComponent = e), t;
					})(t);
				}
			}
			let Pi = (() => {
				class e {}
				return (e.NULL = new mb()), e;
			})();
			function vb() {
				return mr(Oe(), v());
			}
			function mr(e, t) {
				return new hn(nt(e, t));
			}
			let hn = (() => {
				class e {
					constructor(n) {
						this.nativeElement = n;
					}
				}
				return (e.__NG_ELEMENT_ID__ = vb), e;
			})();
			function yb(e) {
				return e instanceof hn ? e.nativeElement : e;
			}
			class Wh {}
			let vs = (() => {
					class e {}
					return (
						(e.__NG_ELEMENT_ID__ = () =>
							(function _b() {
								const e = v(),
									n = rt(Oe().index, e);
								return (tt(n) ? n : e)[H];
							})()),
						e
					);
				})(),
				Cb = (() => {
					class e {}
					return (
						(e.ɵprov = k({
							token: e,
							providedIn: "root",
							factory: () => null,
						})),
						e
					);
				})();
			class ys {
				constructor(t) {
					(this.full = t),
						(this.major = t.split(".")[0]),
						(this.minor = t.split(".")[1]),
						(this.patch = t.split(".").slice(2).join("."));
				}
			}
			const Db = new ys("15.0.4"),
				Zu = {};
			function Yu(e) {
				return e.ngOriginalError;
			}
			class vr {
				constructor() {
					this._console = console;
				}
				handleError(t) {
					const n = this._findOriginalError(t);
					this._console.error("ERROR", t),
						n && this._console.error("ORIGINAL ERROR", n);
				}
				_findOriginalError(t) {
					let n = t && Yu(t);
					for (; n && Yu(n); ) n = Yu(n);
					return n || null;
				}
			}
			function Xt(e) {
				return e instanceof Function ? e() : e;
			}
			function Zh(e, t, n) {
				let r = e.length;
				for (;;) {
					const i = e.indexOf(t, n);
					if (-1 === i) return i;
					if (0 === i || e.charCodeAt(i - 1) <= 32) {
						const o = t.length;
						if (i + o === r || e.charCodeAt(i + o) <= 32) return i;
					}
					n = i + 1;
				}
			}
			const Kh = "ng-template";
			function xb(e, t, n) {
				let r = 0;
				for (; r < e.length; ) {
					let i = e[r++];
					if (n && "class" === i) {
						if (((i = e[r]), -1 !== Zh(i.toLowerCase(), t, 0))) return !0;
					} else if (1 === i) {
						for (; r < e.length && "string" == typeof (i = e[r++]); )
							if (i.toLowerCase() === t) return !0;
						return !1;
					}
				}
				return !1;
			}
			function Yh(e) {
				return 4 === e.type && e.value !== Kh;
			}
			function Rb(e, t, n) {
				return t === (4 !== e.type || n ? e.value : Kh);
			}
			function Nb(e, t, n) {
				let r = 4;
				const i = e.attrs || [],
					o = (function Lb(e) {
						for (let t = 0; t < e.length; t++) if (Mf(e[t])) return t;
						return e.length;
					})(i);
				let s = !1;
				for (let a = 0; a < t.length; a++) {
					const u = t[a];
					if ("number" != typeof u) {
						if (!s)
							if (4 & r) {
								if (
									((r = 2 | (1 & r)),
									("" !== u && !Rb(e, u, n)) || ("" === u && 1 === t.length))
								) {
									if (Ct(r)) return !1;
									s = !0;
								}
							} else {
								const l = 8 & r ? u : t[++a];
								if (8 & r && null !== e.attrs) {
									if (!xb(e.attrs, l, n)) {
										if (Ct(r)) return !1;
										s = !0;
									}
									continue;
								}
								const d = Fb(8 & r ? "class" : u, i, Yh(e), n);
								if (-1 === d) {
									if (Ct(r)) return !1;
									s = !0;
									continue;
								}
								if ("" !== l) {
									let f;
									f = d > o ? "" : i[d + 1].toLowerCase();
									const h = 8 & r ? f : null;
									if ((h && -1 !== Zh(h, l, 0)) || (2 & r && l !== f)) {
										if (Ct(r)) return !1;
										s = !0;
									}
								}
							}
					} else {
						if (!s && !Ct(r) && !Ct(u)) return !1;
						if (s && Ct(u)) continue;
						(s = !1), (r = u | (1 & r));
					}
				}
				return Ct(r) || s;
			}
			function Ct(e) {
				return 0 == (1 & e);
			}
			function Fb(e, t, n, r) {
				if (null === t) return -1;
				let i = 0;
				if (r || !n) {
					let o = !1;
					for (; i < t.length; ) {
						const s = t[i];
						if (s === e) return i;
						if (3 === s || 6 === s) o = !0;
						else {
							if (1 === s || 2 === s) {
								let a = t[++i];
								for (; "string" == typeof a; ) a = t[++i];
								continue;
							}
							if (4 === s) break;
							if (0 === s) {
								i += 4;
								continue;
							}
						}
						i += o ? 1 : 2;
					}
					return -1;
				}
				return (function jb(e, t) {
					let n = e.indexOf(4);
					if (n > -1)
						for (n++; n < e.length; ) {
							const r = e[n];
							if ("number" == typeof r) return -1;
							if (r === t) return n;
							n++;
						}
					return -1;
				})(t, e);
			}
			function Xh(e, t, n = !1) {
				for (let r = 0; r < t.length; r++) if (Nb(e, t[r], n)) return !0;
				return !1;
			}
			function Jh(e, t) {
				return e ? ":not(" + t.trim() + ")" : t;
			}
			function $b(e) {
				let t = e[0],
					n = 1,
					r = 2,
					i = "",
					o = !1;
				for (; n < e.length; ) {
					let s = e[n];
					if ("string" == typeof s)
						if (2 & r) {
							const a = e[++n];
							i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
						} else 8 & r ? (i += "." + s) : 4 & r && (i += " " + s);
					else
						"" !== i && !Ct(s) && ((t += Jh(o, i)), (i = "")),
							(r = s),
							(o = o || !Ct(r));
					n++;
				}
				return "" !== i && (t += Jh(o, i)), t;
			}
			const V = {};
			function K(e) {
				ep(Z(), v(), He() + e, !1);
			}
			function ep(e, t, n, r) {
				if (!r)
					if (3 == (3 & t[2])) {
						const o = e.preOrderCheckHooks;
						null !== o && Ko(t, o, n);
					} else {
						const o = e.preOrderHooks;
						null !== o && Yo(t, o, 0, n);
					}
				Tn(n);
			}
			function ip(e, t = null, n = null, r) {
				const i = op(e, t, n, r);
				return i.resolveInjectorInitializers(), i;
			}
			function op(e, t = null, n = null, r, i = new Set()) {
				const o = [n || Y, ob(e)];
				return (
					(r = r || ("object" == typeof e ? void 0 : ne(e))),
					new Hh(o, t || ms(), r || null, i)
				);
			}
			let Nt = (() => {
				class e {
					static create(n, r) {
						if (Array.isArray(n)) return ip({ name: "" }, r, n, "");
						{
							const i = n.name ?? "";
							return ip({ name: i }, n.parent, n.providers, i);
						}
					}
				}
				return (
					(e.THROW_IF_NOT_FOUND = ii),
					(e.NULL = new jh()),
					(e.ɵprov = k({ token: e, providedIn: "any", factory: () => S(kh) })),
					(e.__NG_ELEMENT_ID__ = -1),
					e
				);
			})();
			function P(e, t = x.Default) {
				const n = v();
				return null === n ? S(e, t) : Rf(Oe(), n, A(e), t);
			}
			function hp(e, t) {
				const n = e.contentQueries;
				if (null !== n)
					for (let r = 0; r < n.length; r += 2) {
						const i = n[r],
							o = n[r + 1];
						if (-1 !== o) {
							const s = e.data[o];
							tu(i), s.contentQueries(2, t[o], o);
						}
					}
			}
			function Cs(e, t, n, r, i, o, s, a, u, l, c) {
				const d = t.blueprint.slice();
				return (
					(d[0] = i),
					(d[2] = 76 | r),
					(null !== c || (e && 1024 & e[2])) && (d[2] |= 1024),
					uf(d),
					(d[3] = d[15] = e),
					(d[8] = n),
					(d[10] = s || (e && e[10])),
					(d[H] = a || (e && e[H])),
					(d[12] = u || (e && e[12]) || null),
					(d[9] = l || (e && e[9]) || null),
					(d[6] = o),
					(d[20] = (function sw() {
						return ow++;
					})()),
					(d[21] = c),
					(d[16] = 2 == t.type ? e[16] : d),
					d
				);
			}
			function Cr(e, t, n, r, i) {
				let o = e.data[t];
				if (null === o)
					(o = (function nl(e, t, n, r, i) {
						const o = hf(),
							s = Ya(),
							u = (e.data[t] = (function h0(e, t, n, r, i, o) {
								return {
									type: n,
									index: r,
									insertBeforeIndex: null,
									injectorIndex: t ? t.injectorIndex : -1,
									directiveStart: -1,
									directiveEnd: -1,
									directiveStylingLast: -1,
									componentOffset: -1,
									propertyBindings: null,
									flags: 0,
									providerIndexes: 0,
									value: i,
									attrs: o,
									mergedAttrs: null,
									localNames: null,
									initialInputs: void 0,
									inputs: null,
									outputs: null,
									tViews: null,
									next: null,
									projectionNext: null,
									child: null,
									parent: t,
									projection: null,
									styles: null,
									stylesWithoutHost: null,
									residualStyles: void 0,
									classes: null,
									classesWithoutHost: null,
									residualClasses: void 0,
									classBindings: 0,
									styleBindings: 0,
								};
							})(0, s ? o : o && o.parent, n, t, r, i));
						return (
							null === e.firstChild && (e.firstChild = u),
							null !== o &&
								(s
									? null == o.child && null !== u.parent && (o.child = u)
									: null === o.next && (o.next = u)),
							u
						);
					})(e, t, n, r, i)),
						(function cD() {
							return j.lFrame.inI18n;
						})() && (o.flags |= 32);
				else if (64 & o.type) {
					(o.type = n), (o.value = r), (o.attrs = i);
					const s = (function fi() {
						const e = j.lFrame,
							t = e.currentTNode;
						return e.isParent ? t : t.parent;
					})();
					o.injectorIndex = null === s ? -1 : s.injectorIndex;
				}
				return xt(o, !0), o;
			}
			function Ti(e, t, n, r) {
				if (0 === n) return -1;
				const i = t.length;
				for (let o = 0; o < n; o++)
					t.push(r), e.blueprint.push(r), e.data.push(null);
				return i;
			}
			function rl(e, t, n) {
				nu(t);
				try {
					const r = e.viewQuery;
					null !== r && hl(1, r, n);
					const i = e.template;
					null !== i && pp(e, t, i, 1, n),
						e.firstCreatePass && (e.firstCreatePass = !1),
						e.staticContentQueries && hp(e, t),
						e.staticViewQueries && hl(2, e.viewQuery, n);
					const o = e.components;
					null !== o &&
						(function c0(e, t) {
							for (let n = 0; n < t.length; n++) x0(e, t[n]);
						})(t, o);
				} catch (r) {
					throw (
						(e.firstCreatePass &&
							((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
						r)
					);
				} finally {
					(t[2] &= -5), ru();
				}
			}
			function Ds(e, t, n, r) {
				const i = t[2];
				if (128 != (128 & i)) {
					nu(t);
					try {
						uf(t),
							(function gf(e) {
								return (j.lFrame.bindingIndex = e);
							})(e.bindingStartIndex),
							null !== n && pp(e, t, n, 2, r);
						const s = 3 == (3 & i);
						if (s) {
							const l = e.preOrderCheckHooks;
							null !== l && Ko(t, l, null);
						} else {
							const l = e.preOrderHooks;
							null !== l && Yo(t, l, 0, null), iu(t, 0);
						}
						if (
							((function O0(e) {
								for (let t = Eu(e); null !== t; t = Iu(t)) {
									if (!t[2]) continue;
									const n = t[9];
									for (let r = 0; r < n.length; r++) {
										const i = n[r],
											o = i[3];
										0 == (512 & i[2]) && Ka(o, 1), (i[2] |= 512);
									}
								}
							})(t),
							(function T0(e) {
								for (let t = Eu(e); null !== t; t = Iu(t))
									for (let n = 10; n < t.length; n++) {
										const r = t[n],
											i = r[1];
										Qo(r) && Ds(i, r, i.template, r[8]);
									}
							})(t),
							null !== e.contentQueries && hp(e, t),
							s)
						) {
							const l = e.contentCheckHooks;
							null !== l && Ko(t, l);
						} else {
							const l = e.contentHooks;
							null !== l && Yo(t, l, 1), iu(t, 1);
						}
						!(function u0(e, t) {
							const n = e.hostBindingOpCodes;
							if (null !== n)
								try {
									for (let r = 0; r < n.length; r++) {
										const i = n[r];
										if (i < 0) Tn(~i);
										else {
											const o = i,
												s = n[++r],
												a = n[++r];
											dD(s, o), a(2, t[o]);
										}
									}
								} finally {
									Tn(-1);
								}
						})(e, t);
						const a = e.components;
						null !== a &&
							(function l0(e, t) {
								for (let n = 0; n < t.length; n++) A0(e, t[n]);
							})(t, a);
						const u = e.viewQuery;
						if ((null !== u && hl(2, u, r), s)) {
							const l = e.viewCheckHooks;
							null !== l && Ko(t, l);
						} else {
							const l = e.viewHooks;
							null !== l && Yo(t, l, 2), iu(t, 2);
						}
						!0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
							(t[2] &= -41),
							512 & t[2] && ((t[2] &= -513), Ka(t[3], -1));
					} finally {
						ru();
					}
				}
			}
			function pp(e, t, n, r, i) {
				const o = He(),
					s = 2 & r;
				try {
					Tn(-1), s && t.length > 22 && ep(e, t, 22, !1), n(r, i);
				} finally {
					Tn(o);
				}
			}
			function il(e, t, n) {
				if (Qa(t)) {
					const i = t.directiveEnd;
					for (let o = t.directiveStart; o < i; o++) {
						const s = e.data[o];
						s.contentQueries && s.contentQueries(1, n[o], o);
					}
				}
			}
			function ol(e, t, n) {
				!cf() ||
					((function _0(e, t, n, r) {
						const i = n.directiveStart,
							o = n.directiveEnd;
						di(n) &&
							(function I0(e, t, n) {
								const r = nt(t, e),
									i = gp(n),
									o = e[10],
									s = ws(
										e,
										Cs(
											e,
											i,
											null,
											n.onPush ? 32 : 16,
											r,
											t,
											o,
											o.createRenderer(r, n),
											null,
											null,
											null
										)
									);
								e[t.index] = s;
							})(t, n, e.data[i + n.componentOffset]),
							e.firstCreatePass || ts(n, t),
							ke(r, t);
						const s = n.initialInputs;
						for (let a = i; a < o; a++) {
							const u = e.data[a],
								l = On(t, e, a, n);
							ke(l, t),
								null !== s && S0(0, a - i, l, u, 0, s),
								_t(u) && (rt(n.index, t)[8] = On(t, e, a, n));
						}
					})(e, t, n, nt(n, t)),
					64 == (64 & n.flags) && Dp(e, t, n));
			}
			function sl(e, t, n = nt) {
				const r = t.localNames;
				if (null !== r) {
					let i = t.index + 1;
					for (let o = 0; o < r.length; o += 2) {
						const s = r[o + 1],
							a = -1 === s ? n(t, e) : e[s];
						e[i++] = a;
					}
				}
			}
			function gp(e) {
				const t = e.tView;
				return null === t || t.incompleteFirstPass
					? (e.tView = al(
							1,
							null,
							e.template,
							e.decls,
							e.vars,
							e.directiveDefs,
							e.pipeDefs,
							e.viewQuery,
							e.schemas,
							e.consts
					  ))
					: t;
			}
			function al(e, t, n, r, i, o, s, a, u, l) {
				const c = 22 + r,
					d = c + i,
					f = (function d0(e, t) {
						const n = [];
						for (let r = 0; r < t; r++) n.push(r < e ? null : V);
						return n;
					})(c, d),
					h = "function" == typeof l ? l() : l;
				return (f[1] = {
					type: e,
					blueprint: f,
					template: n,
					queries: null,
					viewQuery: a,
					declTNode: t,
					data: f.slice().fill(null, c),
					bindingStartIndex: c,
					expandoStartIndex: d,
					hostBindingOpCodes: null,
					firstCreatePass: !0,
					firstUpdatePass: !0,
					staticViewQueries: !1,
					staticContentQueries: !1,
					preOrderHooks: null,
					preOrderCheckHooks: null,
					contentHooks: null,
					contentCheckHooks: null,
					viewHooks: null,
					viewCheckHooks: null,
					destroyHooks: null,
					cleanup: null,
					contentQueries: null,
					components: null,
					directiveRegistry: "function" == typeof o ? o() : o,
					pipeRegistry: "function" == typeof s ? s() : s,
					firstChild: null,
					schemas: u,
					consts: h,
					incompleteFirstPass: !1,
				});
			}
			function mp(e, t, n, r) {
				const i = bp(t);
				null === n
					? i.push(r)
					: (i.push(n), e.firstCreatePass && Mp(e).push(r, i.length - 1));
			}
			function vp(e, t, n, r) {
				for (let i in e)
					if (e.hasOwnProperty(i)) {
						n = null === n ? {} : n;
						const o = e[i];
						null === r
							? yp(n, t, i, o)
							: r.hasOwnProperty(i) && yp(n, t, r[i], o);
					}
				return n;
			}
			function yp(e, t, n, r) {
				e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
			}
			function ot(e, t, n, r, i, o, s, a) {
				const u = nt(t, n);
				let c,
					l = t.inputs;
				!a && null != l && (c = l[r])
					? (pl(e, n, c, r, i), di(t) && _p(n, t.index))
					: 3 & t.type &&
					  ((r = (function g0(e) {
							return "class" === e
								? "className"
								: "for" === e
								? "htmlFor"
								: "formaction" === e
								? "formAction"
								: "innerHtml" === e
								? "innerHTML"
								: "readonly" === e
								? "readOnly"
								: "tabindex" === e
								? "tabIndex"
								: e;
					  })(r)),
					  (i = null != s ? s(i, t.value || "", r) : i),
					  o.setProperty(u, r, i));
			}
			function _p(e, t) {
				const n = rt(t, e);
				16 & n[2] || (n[2] |= 32);
			}
			function ul(e, t, n, r) {
				let i = !1;
				if (cf()) {
					const o = null === r ? null : { "": -1 },
						s = (function D0(e, t) {
							const n = e.directiveRegistry;
							let r = null,
								i = null;
							if (n)
								for (let o = 0; o < n.length; o++) {
									const s = n[o];
									if (Xh(t, s.selectors, !1))
										if ((r || (r = []), _t(s)))
											if (null !== s.findHostDirectiveDefs) {
												const a = [];
												(i = i || new Map()),
													s.findHostDirectiveDefs(s, a, i),
													r.unshift(...a, s),
													ll(e, t, a.length);
											} else r.unshift(s), ll(e, t, 0);
										else
											(i = i || new Map()),
												s.findHostDirectiveDefs?.(s, r, i),
												r.push(s);
								}
							return null === r ? null : [r, i];
						})(e, n);
					let a, u;
					null === s ? (a = u = null) : ([a, u] = s),
						null !== a && ((i = !0), Cp(e, t, n, a, o, u)),
						o &&
							(function w0(e, t, n) {
								if (t) {
									const r = (e.localNames = []);
									for (let i = 0; i < t.length; i += 2) {
										const o = n[t[i + 1]];
										if (null == o) throw new w(-301, !1);
										r.push(t[i], o);
									}
								}
							})(n, r, o);
				}
				return (n.mergedAttrs = pi(n.mergedAttrs, n.attrs)), i;
			}
			function Cp(e, t, n, r, i, o) {
				for (let l = 0; l < r.length; l++) cu(ts(n, t), e, r[l].type);
				!(function M0(e, t, n) {
					(e.flags |= 1),
						(e.directiveStart = t),
						(e.directiveEnd = t + n),
						(e.providerIndexes = t);
				})(n, e.data.length, r.length);
				for (let l = 0; l < r.length; l++) {
					const c = r[l];
					c.providersResolver && c.providersResolver(c);
				}
				let s = !1,
					a = !1,
					u = Ti(e, t, r.length, null);
				for (let l = 0; l < r.length; l++) {
					const c = r[l];
					(n.mergedAttrs = pi(n.mergedAttrs, c.hostAttrs)),
						E0(e, n, t, u, c),
						b0(u, c, i),
						null !== c.contentQueries && (n.flags |= 4),
						(null !== c.hostBindings ||
							null !== c.hostAttrs ||
							0 !== c.hostVars) &&
							(n.flags |= 64);
					const d = c.type.prototype;
					!s &&
						(d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
						((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
						(s = !0)),
						!a &&
							(d.ngOnChanges || d.ngDoCheck) &&
							((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
								n.index
							),
							(a = !0)),
						u++;
				}
				!(function p0(e, t, n) {
					const i = t.directiveEnd,
						o = e.data,
						s = t.attrs,
						a = [];
					let u = null,
						l = null;
					for (let c = t.directiveStart; c < i; c++) {
						const d = o[c],
							f = n ? n.get(d) : null,
							p = f ? f.outputs : null;
						(u = vp(d.inputs, c, u, f ? f.inputs : null)),
							(l = vp(d.outputs, c, l, p));
						const g = null === u || null === s || Yh(t) ? null : P0(u, c, s);
						a.push(g);
					}
					null !== u &&
						(u.hasOwnProperty("class") && (t.flags |= 8),
						u.hasOwnProperty("style") && (t.flags |= 16)),
						(t.initialInputs = a),
						(t.inputs = u),
						(t.outputs = l);
				})(e, n, o);
			}
			function Dp(e, t, n) {
				const r = n.directiveStart,
					i = n.directiveEnd,
					o = n.index,
					s = (function fD() {
						return j.lFrame.currentDirectiveIndex;
					})();
				try {
					Tn(o);
					for (let a = r; a < i; a++) {
						const u = e.data[a],
							l = t[a];
						Ja(a),
							(null !== u.hostBindings ||
								0 !== u.hostVars ||
								null !== u.hostAttrs) &&
								C0(u, l);
					}
				} finally {
					Tn(-1), Ja(s);
				}
			}
			function C0(e, t) {
				null !== e.hostBindings && e.hostBindings(1, t);
			}
			function ll(e, t, n) {
				(t.componentOffset = n),
					(e.components || (e.components = [])).push(t.index);
			}
			function b0(e, t, n) {
				if (n) {
					if (t.exportAs)
						for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
					_t(t) && (n[""] = e);
				}
			}
			function E0(e, t, n, r, i) {
				e.data[r] = i;
				const o = i.factory || (i.factory = Sn(i.type)),
					s = new hi(o, _t(i), P);
				(e.blueprint[r] = s),
					(n[r] = s),
					(function v0(e, t, n, r, i) {
						const o = i.hostBindings;
						if (o) {
							let s = e.hostBindingOpCodes;
							null === s && (s = e.hostBindingOpCodes = []);
							const a = ~t.index;
							(function y0(e) {
								let t = e.length;
								for (; t > 0; ) {
									const n = e[--t];
									if ("number" == typeof n && n < 0) return n;
								}
								return 0;
							})(s) != a && s.push(a),
								s.push(n, r, o);
						}
					})(e, t, r, Ti(e, n, i.hostVars, V), i);
			}
			function Ft(e, t, n, r, i, o) {
				const s = nt(e, t);
				!(function cl(e, t, n, r, i, o, s) {
					if (null == o) e.removeAttribute(t, i, n);
					else {
						const a = null == s ? L(o) : s(o, r || "", i);
						e.setAttribute(t, i, a, n);
					}
				})(t[H], s, o, e.value, n, r, i);
			}
			function S0(e, t, n, r, i, o) {
				const s = o[t];
				if (null !== s) {
					const a = r.setInput;
					for (let u = 0; u < s.length; ) {
						const l = s[u++],
							c = s[u++],
							d = s[u++];
						null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
					}
				}
			}
			function P0(e, t, n) {
				let r = null,
					i = 0;
				for (; i < n.length; ) {
					const o = n[i];
					if (0 !== o)
						if (5 !== o) {
							if ("number" == typeof o) break;
							if (e.hasOwnProperty(o)) {
								null === r && (r = []);
								const s = e[o];
								for (let a = 0; a < s.length; a += 2)
									if (s[a] === t) {
										r.push(o, s[a + 1], n[i + 1]);
										break;
									}
							}
							i += 2;
						} else i += 2;
					else i += 4;
				}
				return r;
			}
			function wp(e, t, n, r) {
				return [e, !0, !1, t, null, 0, r, n, null, null];
			}
			function A0(e, t) {
				const n = rt(t, e);
				if (Qo(n)) {
					const r = n[1];
					48 & n[2] ? Ds(r, n, r.template, n[8]) : n[5] > 0 && dl(n);
				}
			}
			function dl(e) {
				for (let r = Eu(e); null !== r; r = Iu(r))
					for (let i = 10; i < r.length; i++) {
						const o = r[i];
						if (Qo(o))
							if (512 & o[2]) {
								const s = o[1];
								Ds(s, o, s.template, o[8]);
							} else o[5] > 0 && dl(o);
					}
				const n = e[1].components;
				if (null !== n)
					for (let r = 0; r < n.length; r++) {
						const i = rt(n[r], e);
						Qo(i) && i[5] > 0 && dl(i);
					}
			}
			function x0(e, t) {
				const n = rt(t, e),
					r = n[1];
				(function R0(e, t) {
					for (let n = t.length; n < e.blueprint.length; n++)
						t.push(e.blueprint[n]);
				})(r, n),
					rl(r, n, n[8]);
			}
			function ws(e, t) {
				return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
			}
			function fl(e) {
				for (; e; ) {
					e[2] |= 32;
					const t = bi(e);
					if (GC(e) && !t) return e;
					e = t;
				}
				return null;
			}
			function bs(e, t, n, r = !0) {
				const i = t[10];
				i.begin && i.begin();
				try {
					Ds(e, t, e.template, n);
				} catch (s) {
					throw (r && Ip(t, s), s);
				} finally {
					i.end && i.end();
				}
			}
			function hl(e, t, n) {
				tu(0), t(e, n);
			}
			function bp(e) {
				return e[7] || (e[7] = []);
			}
			function Mp(e) {
				return e.cleanup || (e.cleanup = []);
			}
			function Ip(e, t) {
				const n = e[9],
					r = n ? n.get(vr, null) : null;
				r && r.handleError(t);
			}
			function pl(e, t, n, r, i) {
				for (let o = 0; o < n.length; ) {
					const s = n[o++],
						a = n[o++],
						u = t[s],
						l = e.data[s];
					null !== l.setInput ? l.setInput(u, i, r, a) : (u[a] = i);
				}
			}
			function Jt(e, t, n) {
				const r = (function Wo(e, t) {
					return Te(t[e]);
				})(t, e);
				!(function uh(e, t, n) {
					e.setValue(t, n);
				})(e[H], r, n);
			}
			function Ms(e, t, n) {
				let r = n ? e.styles : null,
					i = n ? e.classes : null,
					o = 0;
				if (null !== t)
					for (let s = 0; s < t.length; s++) {
						const a = t[s];
						"number" == typeof a
							? (o = a)
							: 1 == o
							? (i = ka(i, a))
							: 2 == o && (r = ka(r, a + ": " + t[++s] + ";"));
					}
				n ? (e.styles = r) : (e.stylesWithoutHost = r),
					n ? (e.classes = i) : (e.classesWithoutHost = i);
			}
			function Es(e, t, n, r, i = !1) {
				for (; null !== n; ) {
					const o = t[n.index];
					if ((null !== o && r.push(Te(o)), yt(o)))
						for (let a = 10; a < o.length; a++) {
							const u = o[a],
								l = u[1].firstChild;
							null !== l && Es(u[1], u, l, r);
						}
					const s = n.type;
					if (8 & s) Es(e, t, n.child, r);
					else if (32 & s) {
						const a = Mu(n, t);
						let u;
						for (; (u = a()); ) r.push(u);
					} else if (16 & s) {
						const a = _h(t, n);
						if (Array.isArray(a)) r.push(...a);
						else {
							const u = bi(t[16]);
							Es(u[1], u, a, r, !0);
						}
					}
					n = i ? n.projectionNext : n.next;
				}
				return r;
			}
			class Oi {
				constructor(t, n) {
					(this._lView = t),
						(this._cdRefInjectingView = n),
						(this._appRef = null),
						(this._attachedToViewContainer = !1);
				}
				get rootNodes() {
					const t = this._lView,
						n = t[1];
					return Es(n, t, n.firstChild, []);
				}
				get context() {
					return this._lView[8];
				}
				set context(t) {
					this._lView[8] = t;
				}
				get destroyed() {
					return 128 == (128 & this._lView[2]);
				}
				destroy() {
					if (this._appRef) this._appRef.detachView(this);
					else if (this._attachedToViewContainer) {
						const t = this._lView[3];
						if (yt(t)) {
							const n = t[8],
								r = n ? n.indexOf(this) : -1;
							r > -1 && (Tu(t, r), is(n, r));
						}
						this._attachedToViewContainer = !1;
					}
					ch(this._lView[1], this._lView);
				}
				onDestroy(t) {
					mp(this._lView[1], this._lView, null, t);
				}
				markForCheck() {
					fl(this._cdRefInjectingView || this._lView);
				}
				detach() {
					this._lView[2] &= -65;
				}
				reattach() {
					this._lView[2] |= 64;
				}
				detectChanges() {
					bs(this._lView[1], this._lView, this.context);
				}
				checkNoChanges() {}
				attachToViewContainerRef() {
					if (this._appRef) throw new w(902, !1);
					this._attachedToViewContainer = !0;
				}
				detachFromAppRef() {
					(this._appRef = null),
						(function Dw(e, t) {
							Mi(e, t, t[H], 2, null, null);
						})(this._lView[1], this._lView);
				}
				attachToAppRef(t) {
					if (this._attachedToViewContainer) throw new w(902, !1);
					this._appRef = t;
				}
			}
			class N0 extends Oi {
				constructor(t) {
					super(t), (this._view = t);
				}
				detectChanges() {
					const t = this._view;
					bs(t[1], t, t[8], !1);
				}
				checkNoChanges() {}
				get context() {
					return null;
				}
			}
			class Sp extends Pi {
				constructor(t) {
					super(), (this.ngModule = t);
				}
				resolveComponentFactory(t) {
					const n = ee(t);
					return new Ai(n, this.ngModule);
				}
			}
			function Pp(e) {
				const t = [];
				for (let n in e)
					e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
				return t;
			}
			class k0 {
				constructor(t, n) {
					(this.injector = t), (this.parentInjector = n);
				}
				get(t, n, r) {
					r = $o(r);
					const i = this.injector.get(t, Zu, r);
					return i !== Zu || n === Zu ? i : this.parentInjector.get(t, n, r);
				}
			}
			class Ai extends qh {
				constructor(t, n) {
					super(),
						(this.componentDef = t),
						(this.ngModule = n),
						(this.componentType = t.type),
						(this.selector = (function Ub(e) {
							return e.map($b).join(",");
						})(t.selectors)),
						(this.ngContentSelectors = t.ngContentSelectors
							? t.ngContentSelectors
							: []),
						(this.isBoundToModule = !!n);
				}
				get inputs() {
					return Pp(this.componentDef.inputs);
				}
				get outputs() {
					return Pp(this.componentDef.outputs);
				}
				create(t, n, r, i) {
					let o = (i = i || this.ngModule) instanceof Yt ? i : i?.injector;
					o &&
						null !== this.componentDef.getStandaloneInjector &&
						(o = this.componentDef.getStandaloneInjector(o) || o);
					const s = o ? new k0(t, o) : t,
						a = s.get(Wh, null);
					if (null === a) throw new w(407, !1);
					const u = s.get(Cb, null),
						l = a.createRenderer(null, this.componentDef),
						c = this.componentDef.selectors[0][0] || "div",
						d = r
							? (function f0(e, t, n) {
									return e.selectRootElement(t, n === Ot.ShadowDom);
							  })(l, r, this.componentDef.encapsulation)
							: Pu(
									l,
									c,
									(function F0(e) {
										const t = e.toLowerCase();
										return "svg" === t ? "svg" : "math" === t ? "math" : null;
									})(c)
							  ),
						f = this.componentDef.onPush ? 288 : 272,
						h = al(0, null, null, 1, 0, null, null, null, null, null),
						p = Cs(null, h, null, f, null, null, a, l, u, s, null);
					let g, y;
					nu(p);
					try {
						const _ = this.componentDef;
						let M,
							m = null;
						_.findHostDirectiveDefs
							? ((M = []),
							  (m = new Map()),
							  _.findHostDirectiveDefs(_, M, m),
							  M.push(_))
							: (M = [_]);
						const N = (function j0(e, t) {
								const n = e[1];
								return (e[22] = t), Cr(n, 22, 2, "#host", null);
							})(p, d),
							re = (function V0(e, t, n, r, i, o, s, a) {
								const u = i[1];
								!(function $0(e, t, n, r) {
									for (const i of e)
										t.mergedAttrs = pi(t.mergedAttrs, i.hostAttrs);
									null !== t.mergedAttrs &&
										(Ms(t, t.mergedAttrs, !0), null !== n && wh(r, n, t));
								})(r, e, t, s);
								const l = o.createRenderer(t, n),
									c = Cs(
										i,
										gp(n),
										null,
										n.onPush ? 32 : 16,
										i[e.index],
										e,
										o,
										l,
										a || null,
										null,
										null
									);
								return (
									u.firstCreatePass && ll(u, e, r.length - 1),
									ws(i, c),
									(i[e.index] = c)
								);
							})(N, d, _, M, p, a, l);
						(y = af(h, 22)),
							d &&
								(function B0(e, t, n, r) {
									if (r) su(e, n, ["ng-version", Db.full]);
									else {
										const { attrs: i, classes: o } = (function Bb(e) {
											const t = [],
												n = [];
											let r = 1,
												i = 2;
											for (; r < e.length; ) {
												let o = e[r];
												if ("string" == typeof o)
													2 === i
														? "" !== o && t.push(o, e[++r])
														: 8 === i && n.push(o);
												else {
													if (!Ct(i)) break;
													i = o;
												}
												r++;
											}
											return { attrs: t, classes: n };
										})(t.selectors[0]);
										i && su(e, n, i),
											o && o.length > 0 && Dh(e, n, o.join(" "));
									}
								})(l, _, d, r),
							void 0 !== n &&
								(function H0(e, t, n) {
									const r = (e.projection = []);
									for (let i = 0; i < t.length; i++) {
										const o = n[i];
										r.push(null != o ? Array.from(o) : null);
									}
								})(y, this.ngContentSelectors, n),
							(g = (function U0(e, t, n, r, i, o) {
								const s = Oe(),
									a = i[1],
									u = nt(s, i);
								Cp(a, i, s, n, null, r);
								for (let c = 0; c < n.length; c++)
									ke(On(i, a, s.directiveStart + c, s), i);
								Dp(a, i, s), u && ke(u, i);
								const l = On(i, a, s.directiveStart + s.componentOffset, s);
								if (((e[8] = i[8] = l), null !== o)) for (const c of o) c(l, t);
								return il(a, s, e), l;
							})(re, _, M, m, p, [z0])),
							rl(h, p, null);
					} finally {
						ru();
					}
					return new L0(this.componentType, g, mr(y, p), p, y);
				}
			}
			class L0 extends pb {
				constructor(t, n, r, i, o) {
					super(),
						(this.location = r),
						(this._rootLView = i),
						(this._tNode = o),
						(this.instance = n),
						(this.hostView = this.changeDetectorRef = new N0(i)),
						(this.componentType = t);
				}
				setInput(t, n) {
					const r = this._tNode.inputs;
					let i;
					if (null !== r && (i = r[t])) {
						const o = this._rootLView;
						pl(o[1], o, i, t, n), _p(o, this._tNode.index);
					}
				}
				get injector() {
					return new sr(this._tNode, this._rootLView);
				}
				destroy() {
					this.hostView.destroy();
				}
				onDestroy(t) {
					this.hostView.onDestroy(t);
				}
			}
			function z0() {
				const e = Oe();
				Zo(v()[1], e);
			}
			let Is = null;
			function Fn() {
				if (!Is) {
					const e = oe.Symbol;
					if (e && e.iterator) Is = e.iterator;
					else {
						const t = Object.getOwnPropertyNames(Map.prototype);
						for (let n = 0; n < t.length; ++n) {
							const r = t[n];
							"entries" !== r &&
								"size" !== r &&
								Map.prototype[r] === Map.prototype.entries &&
								(Is = r);
						}
					}
				}
				return Is;
			}
			function xi(e) {
				return (
					!!ml(e) && (Array.isArray(e) || (!(e instanceof Map) && Fn() in e))
				);
			}
			function ml(e) {
				return null !== e && ("function" == typeof e || "object" == typeof e);
			}
			function kt(e, t, n) {
				return (e[t] = n);
			}
			function Le(e, t, n) {
				return !Object.is(e[t], n) && ((e[t] = n), !0);
			}
			function vl(e, t, n, r) {
				const i = v();
				return Le(i, ir(), t) && (Z(), Ft(le(), i, e, t, n, r)), vl;
			}
			function wr(e, t, n, r) {
				return Le(e, ir(), n) ? t + L(n) + r : V;
			}
			function Ni(e, t, n, r, i, o, s, a) {
				const u = v(),
					l = Z(),
					c = e + 22,
					d = l.firstCreatePass
						? (function iM(e, t, n, r, i, o, s, a, u) {
								const l = t.consts,
									c = Cr(t, e, 4, s || null, dn(l, a));
								ul(t, n, c, dn(l, u)), Zo(t, c);
								const d = (c.tViews = al(
									2,
									c,
									r,
									i,
									o,
									t.directiveRegistry,
									t.pipeRegistry,
									null,
									t.schemas,
									l
								));
								return (
									null !== t.queries &&
										(t.queries.template(t, c),
										(d.queries = t.queries.embeddedTView(c))),
									c
								);
						  })(c, l, u, t, n, r, i, o, s)
						: l.data[c];
				xt(d, !1);
				const f = u[H].createComment("");
				ls(l, u, f, d),
					ke(f, u),
					ws(u, (u[c] = wp(f, u, f, d))),
					Go(d) && ol(l, u, d),
					null != s && sl(u, d, a);
			}
			function Ae(e, t, n) {
				const r = v();
				return Le(r, ir(), t) && ot(Z(), le(), r, e, t, r[H], n, !1), Ae;
			}
			function yl(e, t, n, r, i) {
				const s = i ? "class" : "style";
				pl(e, n, t.inputs[s], s, r);
			}
			function C(e, t, n, r) {
				const i = v(),
					o = Z(),
					s = 22 + e,
					a = i[H],
					u = (i[s] = Pu(
						a,
						t,
						(function CD() {
							return j.lFrame.currentNamespace;
						})()
					)),
					l = o.firstCreatePass
						? (function aM(e, t, n, r, i, o, s) {
								const a = t.consts,
									l = Cr(t, e, 2, i, dn(a, o));
								return (
									ul(t, n, l, dn(a, s)),
									null !== l.attrs && Ms(l, l.attrs, !1),
									null !== l.mergedAttrs && Ms(l, l.mergedAttrs, !0),
									null !== t.queries && t.queries.elementStart(t, l),
									l
								);
						  })(s, o, i, 0, t, n, r)
						: o.data[s];
				return (
					xt(l, !0),
					wh(a, u, l),
					32 != (32 & l.flags) && ls(o, i, u, l),
					0 ===
						(function iD() {
							return j.lFrame.elementDepthCount;
						})() && ke(u, i),
					(function oD() {
						j.lFrame.elementDepthCount++;
					})(),
					Go(l) && (ol(o, i, l), il(o, l, i)),
					null !== r && sl(i, l),
					C
				);
			}
			function D() {
				let e = Oe();
				Ya()
					? (function Xa() {
							j.lFrame.isParent = !1;
					  })()
					: ((e = e.parent), xt(e, !1));
				const t = e;
				!(function sD() {
					j.lFrame.elementDepthCount--;
				})();
				const n = Z();
				return (
					n.firstCreatePass && (Zo(n, e), Qa(e) && n.queries.elementEnd(e)),
					null != t.classesWithoutHost &&
						(function MD(e) {
							return 0 != (8 & e.flags);
						})(t) &&
						yl(n, t, v(), t.classesWithoutHost, !0),
					null != t.stylesWithoutHost &&
						(function ED(e) {
							return 0 != (16 & e.flags);
						})(t) &&
						yl(n, t, v(), t.stylesWithoutHost, !1),
					D
				);
			}
			function $(e, t, n, r) {
				return C(e, t, n, r), D(), $;
			}
			function Ps(e) {
				return !!e && "function" == typeof e.then;
			}
			const Gp = function qp(e) {
				return !!e && "function" == typeof e.subscribe;
			};
			function Fi(e, t, n, r) {
				const i = v(),
					o = Z(),
					s = Oe();
				return (
					(function Qp(e, t, n, r, i, o, s) {
						const a = Go(r),
							l = e.firstCreatePass && Mp(e),
							c = t[8],
							d = bp(t);
						let f = !0;
						if (3 & r.type || s) {
							const g = nt(r, t),
								y = s ? s(g) : g,
								_ = d.length,
								M = s ? (N) => s(Te(N[r.index])) : r.index;
							let m = null;
							if (
								(!s &&
									a &&
									(m = (function lM(e, t, n, r) {
										const i = e.cleanup;
										if (null != i)
											for (let o = 0; o < i.length - 1; o += 2) {
												const s = i[o];
												if (s === n && i[o + 1] === r) {
													const a = t[7],
														u = i[o + 2];
													return a.length > u ? a[u] : null;
												}
												"string" == typeof s && (o += 2);
											}
										return null;
									})(e, t, i, r.index)),
								null !== m)
							)
								((m.__ngLastListenerFn__ || m).__ngNextListenerFn__ = o),
									(m.__ngLastListenerFn__ = o),
									(f = !1);
							else {
								o = Kp(r, t, c, o, !1);
								const N = n.listen(y, i, o);
								d.push(o, N), l && l.push(i, M, _, _ + 1);
							}
						} else o = Kp(r, t, c, o, !1);
						const h = r.outputs;
						let p;
						if (f && null !== h && (p = h[i])) {
							const g = p.length;
							if (g)
								for (let y = 0; y < g; y += 2) {
									const re = t[p[y]][p[y + 1]].subscribe(o),
										ge = d.length;
									d.push(o, re), l && l.push(i, r.index, ge, -(ge + 1));
								}
						}
					})(o, i, i[H], s, e, t, r),
					Fi
				);
			}
			function Zp(e, t, n, r) {
				try {
					return !1 !== n(r);
				} catch (i) {
					return Ip(e, i), !1;
				}
			}
			function Kp(e, t, n, r, i) {
				return function o(s) {
					if (s === Function) return r;
					fl(e.componentOffset > -1 ? rt(e.index, t) : t);
					let u = Zp(t, 0, r, s),
						l = o.__ngNextListenerFn__;
					for (; l; ) (u = Zp(t, 0, l, s) && u), (l = l.__ngNextListenerFn__);
					return i && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
				};
			}
			function Yp(e = 1) {
				return (function pD(e) {
					return (j.lFrame.contextLView = (function gD(e, t) {
						for (; e > 0; ) (t = t[15]), e--;
						return t;
					})(e, j.lFrame.contextLView))[8];
				})(e);
			}
			function Or(e, t, n) {
				return Dl(e, "", t, "", n), Or;
			}
			function Dl(e, t, n, r, i) {
				const o = v(),
					s = wr(o, t, n, r);
				return s !== V && ot(Z(), le(), o, e, s, o[H], i, !1), Dl;
			}
			function I(e, t = "") {
				const n = v(),
					r = Z(),
					i = e + 22,
					o = r.firstCreatePass ? Cr(r, i, 1, t, null) : r.data[i],
					s = (n[i] = (function Su(e, t) {
						return e.createText(t);
					})(n[H], t));
				ls(r, n, s, o), xt(o, !1);
			}
			function en(e) {
				return ft("", e, ""), en;
			}
			function ft(e, t, n) {
				const r = v(),
					i = wr(r, e, t, n);
				return i !== V && Jt(r, He(), i), ft;
			}
			const Rr = "en-US";
			let Bg = Rr;
			class Nr {}
			class pm {}
			class gm extends Nr {
				constructor(t, n) {
					super(),
						(this._parent = n),
						(this._bootstrapComponents = []),
						(this.destroyCbs = []),
						(this.componentFactoryResolver = new Sp(this));
					const r = et(t);
					(this._bootstrapComponents = Xt(r.bootstrap)),
						(this._r3Injector = op(
							t,
							n,
							[
								{ provide: Nr, useValue: this },
								{ provide: Pi, useValue: this.componentFactoryResolver },
							],
							ne(t),
							new Set(["environment"])
						)),
						this._r3Injector.resolveInjectorInitializers(),
						(this.instance = this._r3Injector.get(t));
				}
				get injector() {
					return this._r3Injector;
				}
				destroy() {
					const t = this._r3Injector;
					!t.destroyed && t.destroy(),
						this.destroyCbs.forEach((n) => n()),
						(this.destroyCbs = null);
				}
				onDestroy(t) {
					this.destroyCbs.push(t);
				}
			}
			class xl extends pm {
				constructor(t) {
					super(), (this.moduleType = t);
				}
				create(t) {
					return new gm(this.moduleType, t);
				}
			}
			class eI extends Nr {
				constructor(t, n, r) {
					super(),
						(this.componentFactoryResolver = new Sp(this)),
						(this.instance = null);
					const i = new Hh(
						[
							...t,
							{ provide: Nr, useValue: this },
							{ provide: Pi, useValue: this.componentFactoryResolver },
						],
						n || ms(),
						r,
						new Set(["environment"])
					);
					(this.injector = i), i.resolveInjectorInitializers();
				}
				destroy() {
					this.injector.destroy();
				}
				onDestroy(t) {
					this.injector.onDestroy(t);
				}
			}
			function Fs(e, t, n = null) {
				return new eI(e, t, n).injector;
			}
			let tI = (() => {
				class e {
					constructor(n) {
						(this._injector = n), (this.cachedInjectors = new Map());
					}
					getOrCreateStandaloneInjector(n) {
						if (!n.standalone) return null;
						if (!this.cachedInjectors.has(n.id)) {
							const r = Vh(0, n.type),
								i =
									r.length > 0
										? Fs([r], this._injector, `Standalone[${n.type.name}]`)
										: null;
							this.cachedInjectors.set(n.id, i);
						}
						return this.cachedInjectors.get(n.id);
					}
					ngOnDestroy() {
						try {
							for (const n of this.cachedInjectors.values())
								null !== n && n.destroy();
						} finally {
							this.cachedInjectors.clear();
						}
					}
				}
				return (
					(e.ɵprov = k({
						token: e,
						providedIn: "environment",
						factory: () => new e(S(Yt)),
					})),
					e
				);
			})();
			function mm(e) {
				e.getStandaloneInjector = (t) =>
					t.get(tI).getOrCreateStandaloneInjector(e);
			}
			function ks(e, t, n, r) {
				return (function Mm(e, t, n, r, i, o) {
					const s = t + n;
					return Le(e, s, i)
						? kt(e, s + 1, o ? r.call(o, i) : r(i))
						: (function Bi(e, t) {
								const n = e[t];
								return n === V ? void 0 : n;
						  })(e, s + 1);
				})(v(), Be(), e, t, n, r);
			}
			function Nl(e) {
				return (t) => {
					setTimeout(e, void 0, t);
				};
			}
			const qe = class EI extends Ut {
				constructor(t = !1) {
					super(), (this.__isAsync = t);
				}
				emit(t) {
					super.next(t);
				}
				subscribe(t, n, r) {
					let i = t,
						o = n || (() => null),
						s = r;
					if (t && "object" == typeof t) {
						const u = t;
						(i = u.next?.bind(u)),
							(o = u.error?.bind(u)),
							(s = u.complete?.bind(u));
					}
					this.__isAsync && ((o = Nl(o)), i && (i = Nl(i)), s && (s = Nl(s)));
					const a = super.subscribe({ next: i, error: o, complete: s });
					return t instanceof st && t.add(a), a;
				}
			};
			function II() {
				return this._results[Fn()]();
			}
			class Fl {
				constructor(t = !1) {
					(this._emitDistinctChangesOnly = t),
						(this.dirty = !0),
						(this._results = []),
						(this._changesDetected = !1),
						(this._changes = null),
						(this.length = 0),
						(this.first = void 0),
						(this.last = void 0);
					const n = Fn(),
						r = Fl.prototype;
					r[n] || (r[n] = II);
				}
				get changes() {
					return this._changes || (this._changes = new qe());
				}
				get(t) {
					return this._results[t];
				}
				map(t) {
					return this._results.map(t);
				}
				filter(t) {
					return this._results.filter(t);
				}
				find(t) {
					return this._results.find(t);
				}
				reduce(t, n) {
					return this._results.reduce(t, n);
				}
				forEach(t) {
					this._results.forEach(t);
				}
				some(t) {
					return this._results.some(t);
				}
				toArray() {
					return this._results.slice();
				}
				toString() {
					return this._results.toString();
				}
				reset(t, n) {
					const r = this;
					r.dirty = !1;
					const i = (function ct(e) {
						return e.flat(Number.POSITIVE_INFINITY);
					})(t);
					(this._changesDetected = !(function FD(e, t, n) {
						if (e.length !== t.length) return !1;
						for (let r = 0; r < e.length; r++) {
							let i = e[r],
								o = t[r];
							if ((n && ((i = n(i)), (o = n(o))), o !== i)) return !1;
						}
						return !0;
					})(r._results, i, n)) &&
						((r._results = i),
						(r.length = i.length),
						(r.last = i[this.length - 1]),
						(r.first = i[0]));
				}
				notifyOnChanges() {
					this._changes &&
						(this._changesDetected || !this._emitDistinctChangesOnly) &&
						this._changes.emit(this);
				}
				setDirty() {
					this.dirty = !0;
				}
				destroy() {
					this.changes.complete(), this.changes.unsubscribe();
				}
			}
			let tn = (() => {
				class e {}
				return (e.__NG_ELEMENT_ID__ = TI), e;
			})();
			const SI = tn,
				PI = class extends SI {
					constructor(t, n, r) {
						super(),
							(this._declarationLView = t),
							(this._declarationTContainer = n),
							(this.elementRef = r);
					}
					createEmbeddedView(t, n) {
						const r = this._declarationTContainer.tViews,
							i = Cs(
								this._declarationLView,
								r,
								t,
								16,
								null,
								r.declTNode,
								null,
								null,
								null,
								null,
								n || null
							);
						i[17] = this._declarationLView[this._declarationTContainer.index];
						const s = this._declarationLView[19];
						return (
							null !== s && (i[19] = s.createEmbeddedView(r)),
							rl(r, i, t),
							new Oi(i)
						);
					}
				};
			function TI() {
				return Ls(Oe(), v());
			}
			function Ls(e, t) {
				return 4 & e.type ? new PI(t, e, mr(e, t)) : null;
			}
			let bt = (() => {
				class e {}
				return (e.__NG_ELEMENT_ID__ = OI), e;
			})();
			function OI() {
				return Am(Oe(), v());
			}
			const AI = bt,
				Tm = class extends AI {
					constructor(t, n, r) {
						super(),
							(this._lContainer = t),
							(this._hostTNode = n),
							(this._hostLView = r);
					}
					get element() {
						return mr(this._hostTNode, this._hostLView);
					}
					get injector() {
						return new sr(this._hostTNode, this._hostLView);
					}
					get parentInjector() {
						const t = lu(this._hostTNode, this._hostLView);
						if (Sf(t)) {
							const n = Jo(t, this._hostLView),
								r = Xo(t);
							return new sr(n[1].data[r + 8], n);
						}
						return new sr(null, this._hostLView);
					}
					clear() {
						for (; this.length > 0; ) this.remove(this.length - 1);
					}
					get(t) {
						const n = Om(this._lContainer);
						return (null !== n && n[t]) || null;
					}
					get length() {
						return this._lContainer.length - 10;
					}
					createEmbeddedView(t, n, r) {
						let i, o;
						"number" == typeof r
							? (i = r)
							: null != r && ((i = r.index), (o = r.injector));
						const s = t.createEmbeddedView(n || {}, o);
						return this.insert(s, i), s;
					}
					createComponent(t, n, r, i, o) {
						const s =
							t &&
							!(function mi(e) {
								return "function" == typeof e;
							})(t);
						let a;
						if (s) a = n;
						else {
							const d = n || {};
							(a = d.index),
								(r = d.injector),
								(i = d.projectableNodes),
								(o = d.environmentInjector || d.ngModuleRef);
						}
						const u = s ? t : new Ai(ee(t)),
							l = r || this.parentInjector;
						if (!o && null == u.ngModule) {
							const f = (s ? l : this.parentInjector).get(Yt, null);
							f && (o = f);
						}
						const c = u.create(l, i, void 0, o);
						return this.insert(c.hostView, a), c;
					}
					insert(t, n) {
						const r = t._lView,
							i = r[1];
						if (
							(function rD(e) {
								return yt(e[3]);
							})(r)
						) {
							const c = this.indexOf(t);
							if (-1 !== c) this.detach(c);
							else {
								const d = r[3],
									f = new Tm(d, d[6], d[3]);
								f.detach(f.indexOf(t));
							}
						}
						const o = this._adjustIndex(n),
							s = this._lContainer;
						!(function bw(e, t, n, r) {
							const i = 10 + r,
								o = n.length;
							r > 0 && (n[i - 1][4] = t),
								r < o - 10
									? ((t[4] = n[i]), $f(n, 10 + r, t))
									: (n.push(t), (t[4] = null)),
								(t[3] = n);
							const s = t[17];
							null !== s &&
								n !== s &&
								(function Mw(e, t) {
									const n = e[9];
									t[16] !== t[3][3][16] && (e[2] = !0),
										null === n ? (e[9] = [t]) : n.push(t);
								})(s, t);
							const a = t[19];
							null !== a && a.insertView(e), (t[2] |= 64);
						})(i, r, s, o);
						const a = xu(o, s),
							u = r[H],
							l = us(u, s[7]);
						return (
							null !== l &&
								(function Cw(e, t, n, r, i, o) {
									(r[0] = i), (r[6] = t), Mi(e, r, n, 1, i, o);
								})(i, s[6], u, r, l, a),
							t.attachToViewContainerRef(),
							$f(kl(s), o, t),
							t
						);
					}
					move(t, n) {
						return this.insert(t, n);
					}
					indexOf(t) {
						const n = Om(this._lContainer);
						return null !== n ? n.indexOf(t) : -1;
					}
					remove(t) {
						const n = this._adjustIndex(t, -1),
							r = Tu(this._lContainer, n);
						r && (is(kl(this._lContainer), n), ch(r[1], r));
					}
					detach(t) {
						const n = this._adjustIndex(t, -1),
							r = Tu(this._lContainer, n);
						return r && null != is(kl(this._lContainer), n) ? new Oi(r) : null;
					}
					_adjustIndex(t, n = 0) {
						return t ?? this.length + n;
					}
				};
			function Om(e) {
				return e[8];
			}
			function kl(e) {
				return e[8] || (e[8] = []);
			}
			function Am(e, t) {
				let n;
				const r = t[e.index];
				if (yt(r)) n = r;
				else {
					let i;
					if (8 & e.type) i = Te(r);
					else {
						const o = t[H];
						i = o.createComment("");
						const s = nt(e, t);
						xn(
							o,
							us(o, s),
							i,
							(function Pw(e, t) {
								return e.nextSibling(t);
							})(o, s),
							!1
						);
					}
					(t[e.index] = n = wp(r, t, i, e)), ws(t, n);
				}
				return new Tm(n, e, t);
			}
			class Ll {
				constructor(t) {
					(this.queryList = t), (this.matches = null);
				}
				clone() {
					return new Ll(this.queryList);
				}
				setDirty() {
					this.queryList.setDirty();
				}
			}
			class jl {
				constructor(t = []) {
					this.queries = t;
				}
				createEmbeddedView(t) {
					const n = t.queries;
					if (null !== n) {
						const r =
								null !== t.contentQueries ? t.contentQueries[0] : n.length,
							i = [];
						for (let o = 0; o < r; o++) {
							const s = n.getByIndex(o);
							i.push(this.queries[s.indexInDeclarationView].clone());
						}
						return new jl(i);
					}
					return null;
				}
				insertView(t) {
					this.dirtyQueriesWithMatches(t);
				}
				detachView(t) {
					this.dirtyQueriesWithMatches(t);
				}
				dirtyQueriesWithMatches(t) {
					for (let n = 0; n < this.queries.length; n++)
						null !== Vm(t, n).matches && this.queries[n].setDirty();
				}
			}
			class xm {
				constructor(t, n, r = null) {
					(this.predicate = t), (this.flags = n), (this.read = r);
				}
			}
			class Vl {
				constructor(t = []) {
					this.queries = t;
				}
				elementStart(t, n) {
					for (let r = 0; r < this.queries.length; r++)
						this.queries[r].elementStart(t, n);
				}
				elementEnd(t) {
					for (let n = 0; n < this.queries.length; n++)
						this.queries[n].elementEnd(t);
				}
				embeddedTView(t) {
					let n = null;
					for (let r = 0; r < this.length; r++) {
						const i = null !== n ? n.length : 0,
							o = this.getByIndex(r).embeddedTView(t, i);
						o &&
							((o.indexInDeclarationView = r),
							null !== n ? n.push(o) : (n = [o]));
					}
					return null !== n ? new Vl(n) : null;
				}
				template(t, n) {
					for (let r = 0; r < this.queries.length; r++)
						this.queries[r].template(t, n);
				}
				getByIndex(t) {
					return this.queries[t];
				}
				get length() {
					return this.queries.length;
				}
				track(t) {
					this.queries.push(t);
				}
			}
			class $l {
				constructor(t, n = -1) {
					(this.metadata = t),
						(this.matches = null),
						(this.indexInDeclarationView = -1),
						(this.crossesNgTemplate = !1),
						(this._appliesToNextNode = !0),
						(this._declarationNodeIndex = n);
				}
				elementStart(t, n) {
					this.isApplyingToNode(n) && this.matchTNode(t, n);
				}
				elementEnd(t) {
					this._declarationNodeIndex === t.index &&
						(this._appliesToNextNode = !1);
				}
				template(t, n) {
					this.elementStart(t, n);
				}
				embeddedTView(t, n) {
					return this.isApplyingToNode(t)
						? ((this.crossesNgTemplate = !0),
						  this.addMatch(-t.index, n),
						  new $l(this.metadata))
						: null;
				}
				isApplyingToNode(t) {
					if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
						const n = this._declarationNodeIndex;
						let r = t.parent;
						for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
						return n === (null !== r ? r.index : -1);
					}
					return this._appliesToNextNode;
				}
				matchTNode(t, n) {
					const r = this.metadata.predicate;
					if (Array.isArray(r))
						for (let i = 0; i < r.length; i++) {
							const o = r[i];
							this.matchTNodeWithReadOption(t, n, xI(n, o)),
								this.matchTNodeWithReadOption(t, n, ns(n, t, o, !1, !1));
						}
					else
						r === tn
							? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
							: this.matchTNodeWithReadOption(t, n, ns(n, t, r, !1, !1));
				}
				matchTNodeWithReadOption(t, n, r) {
					if (null !== r) {
						const i = this.metadata.read;
						if (null !== i)
							if (i === hn || i === bt || (i === tn && 4 & n.type))
								this.addMatch(n.index, -2);
							else {
								const o = ns(n, t, i, !1, !1);
								null !== o && this.addMatch(n.index, o);
							}
						else this.addMatch(n.index, r);
					}
				}
				addMatch(t, n) {
					null === this.matches
						? (this.matches = [t, n])
						: this.matches.push(t, n);
				}
			}
			function xI(e, t) {
				const n = e.localNames;
				if (null !== n)
					for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
				return null;
			}
			function NI(e, t, n, r) {
				return -1 === n
					? (function RI(e, t) {
							return 11 & e.type ? mr(e, t) : 4 & e.type ? Ls(e, t) : null;
					  })(t, e)
					: -2 === n
					? (function FI(e, t, n) {
							return n === hn
								? mr(t, e)
								: n === tn
								? Ls(t, e)
								: n === bt
								? Am(t, e)
								: void 0;
					  })(e, t, r)
					: On(e, e[1], n, t);
			}
			function Rm(e, t, n, r) {
				const i = t[19].queries[r];
				if (null === i.matches) {
					const o = e.data,
						s = n.matches,
						a = [];
					for (let u = 0; u < s.length; u += 2) {
						const l = s[u];
						a.push(l < 0 ? null : NI(t, o[l], s[u + 1], n.metadata.read));
					}
					i.matches = a;
				}
				return i.matches;
			}
			function Ul(e, t, n, r) {
				const i = e.queries.getByIndex(n),
					o = i.matches;
				if (null !== o) {
					const s = Rm(e, t, i, n);
					for (let a = 0; a < o.length; a += 2) {
						const u = o[a];
						if (u > 0) r.push(s[a / 2]);
						else {
							const l = o[a + 1],
								c = t[-u];
							for (let d = 10; d < c.length; d++) {
								const f = c[d];
								f[17] === f[3] && Ul(f[1], f, l, r);
							}
							if (null !== c[9]) {
								const d = c[9];
								for (let f = 0; f < d.length; f++) {
									const h = d[f];
									Ul(h[1], h, l, r);
								}
							}
						}
					}
				}
				return r;
			}
			function Nm(e) {
				const t = v(),
					n = Z(),
					r = vf();
				tu(r + 1);
				const i = Vm(n, r);
				if (
					e.dirty &&
					(function nD(e) {
						return 4 == (4 & e[2]);
					})(t) ===
						(2 == (2 & i.metadata.flags))
				) {
					if (null === i.matches) e.reset([]);
					else {
						const o = i.crossesNgTemplate ? Ul(n, t, r, []) : Rm(n, t, i, r);
						e.reset(o, yb), e.notifyOnChanges();
					}
					return !0;
				}
				return !1;
			}
			function Fm(e, t, n, r) {
				const i = Z();
				if (i.firstCreatePass) {
					const o = Oe();
					(function jm(e, t, n) {
						null === e.queries && (e.queries = new Vl()),
							e.queries.track(new $l(t, n));
					})(i, new xm(t, n, r), o.index),
						(function jI(e, t) {
							const n = e.contentQueries || (e.contentQueries = []);
							t !== (n.length ? n[n.length - 1] : -1) &&
								n.push(e.queries.length - 1, t);
						})(i, e),
						2 == (2 & n) && (i.staticContentQueries = !0);
				}
				!(function Lm(e, t, n) {
					const r = new Fl(4 == (4 & n));
					mp(e, t, r, r.destroy),
						null === t[19] && (t[19] = new jl()),
						t[19].queries.push(new Ll(r));
				})(i, v(), n);
			}
			function Vm(e, t) {
				return e.queries.getByIndex(t);
			}
			function Vs(...e) {}
			const $s = new F("Application Initializer");
			let Us = (() => {
				class e {
					constructor(n) {
						(this.appInits = n),
							(this.resolve = Vs),
							(this.reject = Vs),
							(this.initialized = !1),
							(this.done = !1),
							(this.donePromise = new Promise((r, i) => {
								(this.resolve = r), (this.reject = i);
							}));
					}
					runInitializers() {
						if (this.initialized) return;
						const n = [],
							r = () => {
								(this.done = !0), this.resolve();
							};
						if (this.appInits)
							for (let i = 0; i < this.appInits.length; i++) {
								const o = this.appInits[i]();
								if (Ps(o)) n.push(o);
								else if (Gp(o)) {
									const s = new Promise((a, u) => {
										o.subscribe({ complete: a, error: u });
									});
									n.push(s);
								}
							}
						Promise.all(n)
							.then(() => {
								r();
							})
							.catch((i) => {
								this.reject(i);
							}),
							0 === n.length && r(),
							(this.initialized = !0);
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(S($s, 8));
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
					e
				);
			})();
			const qi = new F("AppId", {
				providedIn: "root",
				factory: function iv() {
					return `${Gl()}${Gl()}${Gl()}`;
				},
			});
			function Gl() {
				return String.fromCharCode(97 + Math.floor(25 * Math.random()));
			}
			const ov = new F("Platform Initializer"),
				sv = new F("Platform ID", {
					providedIn: "platform",
					factory: () => "unknown",
				}),
				av = new F("appBootstrapListener");
			let oS = (() => {
				class e {
					log(n) {
						console.log(n);
					}
					warn(n) {
						console.warn(n);
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)();
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "platform" })),
					e
				);
			})();
			const nn = new F("LocaleId", {
				providedIn: "root",
				factory: () =>
					Q(nn, x.Optional | x.SkipSelf) ||
					(function sS() {
						return (typeof $localize < "u" && $localize.locale) || Rr;
					})(),
			});
			class uS {
				constructor(t, n) {
					(this.ngModuleFactory = t), (this.componentFactories = n);
				}
			}
			let uv = (() => {
				class e {
					compileModuleSync(n) {
						return new xl(n);
					}
					compileModuleAsync(n) {
						return Promise.resolve(this.compileModuleSync(n));
					}
					compileModuleAndAllComponentsSync(n) {
						const r = this.compileModuleSync(n),
							o = Xt(et(n).declarations).reduce((s, a) => {
								const u = ee(a);
								return u && s.push(new Ai(u)), s;
							}, []);
						return new uS(r, o);
					}
					compileModuleAndAllComponentsAsync(n) {
						return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
					}
					clearCache() {}
					clearCacheFor(n) {}
					getModuleId(n) {}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)();
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
					e
				);
			})();
			const dS = (() => Promise.resolve(0))();
			function Wl(e) {
				typeof Zone > "u"
					? dS.then(() => {
							e && e.apply(null, null);
					  })
					: Zone.current.scheduleMicroTask("scheduleMicrotask", e);
			}
			class ve {
				constructor({
					enableLongStackTrace: t = !1,
					shouldCoalesceEventChangeDetection: n = !1,
					shouldCoalesceRunChangeDetection: r = !1,
				}) {
					if (
						((this.hasPendingMacrotasks = !1),
						(this.hasPendingMicrotasks = !1),
						(this.isStable = !0),
						(this.onUnstable = new qe(!1)),
						(this.onMicrotaskEmpty = new qe(!1)),
						(this.onStable = new qe(!1)),
						(this.onError = new qe(!1)),
						typeof Zone > "u")
					)
						throw new w(908, !1);
					Zone.assertZonePatched();
					const i = this;
					(i._nesting = 0),
						(i._outer = i._inner = Zone.current),
						Zone.TaskTrackingZoneSpec &&
							(i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
						t &&
							Zone.longStackTraceZoneSpec &&
							(i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
						(i.shouldCoalesceEventChangeDetection = !r && n),
						(i.shouldCoalesceRunChangeDetection = r),
						(i.lastRequestAnimationFrameId = -1),
						(i.nativeRequestAnimationFrame = (function fS() {
							let e = oe.requestAnimationFrame,
								t = oe.cancelAnimationFrame;
							if (typeof Zone < "u" && e && t) {
								const n = e[Zone.__symbol__("OriginalDelegate")];
								n && (e = n);
								const r = t[Zone.__symbol__("OriginalDelegate")];
								r && (t = r);
							}
							return {
								nativeRequestAnimationFrame: e,
								nativeCancelAnimationFrame: t,
							};
						})().nativeRequestAnimationFrame),
						(function gS(e) {
							const t = () => {
								!(function pS(e) {
									e.isCheckStableRunning ||
										-1 !== e.lastRequestAnimationFrameId ||
										((e.lastRequestAnimationFrameId =
											e.nativeRequestAnimationFrame.call(oe, () => {
												e.fakeTopEventTask ||
													(e.fakeTopEventTask = Zone.root.scheduleEventTask(
														"fakeTopEventTask",
														() => {
															(e.lastRequestAnimationFrameId = -1),
																Zl(e),
																(e.isCheckStableRunning = !0),
																Ql(e),
																(e.isCheckStableRunning = !1);
														},
														void 0,
														() => {},
														() => {}
													)),
													e.fakeTopEventTask.invoke();
											})),
										Zl(e));
								})(e);
							};
							e._inner = e._inner.fork({
								name: "angular",
								properties: { isAngularZone: !0 },
								onInvokeTask: (n, r, i, o, s, a) => {
									try {
										return dv(e), n.invokeTask(i, o, s, a);
									} finally {
										((e.shouldCoalesceEventChangeDetection &&
											"eventTask" === o.type) ||
											e.shouldCoalesceRunChangeDetection) &&
											t(),
											fv(e);
									}
								},
								onInvoke: (n, r, i, o, s, a, u) => {
									try {
										return dv(e), n.invoke(i, o, s, a, u);
									} finally {
										e.shouldCoalesceRunChangeDetection && t(), fv(e);
									}
								},
								onHasTask: (n, r, i, o) => {
									n.hasTask(i, o),
										r === i &&
											("microTask" == o.change
												? ((e._hasPendingMicrotasks = o.microTask),
												  Zl(e),
												  Ql(e))
												: "macroTask" == o.change &&
												  (e.hasPendingMacrotasks = o.macroTask));
								},
								onHandleError: (n, r, i, o) => (
									n.handleError(i, o),
									e.runOutsideAngular(() => e.onError.emit(o)),
									!1
								),
							});
						})(i);
				}
				static isInAngularZone() {
					return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
				}
				static assertInAngularZone() {
					if (!ve.isInAngularZone()) throw new w(909, !1);
				}
				static assertNotInAngularZone() {
					if (ve.isInAngularZone()) throw new w(909, !1);
				}
				run(t, n, r) {
					return this._inner.run(t, n, r);
				}
				runTask(t, n, r, i) {
					const o = this._inner,
						s = o.scheduleEventTask("NgZoneEvent: " + i, t, hS, Vs, Vs);
					try {
						return o.runTask(s, n, r);
					} finally {
						o.cancelTask(s);
					}
				}
				runGuarded(t, n, r) {
					return this._inner.runGuarded(t, n, r);
				}
				runOutsideAngular(t) {
					return this._outer.run(t);
				}
			}
			const hS = {};
			function Ql(e) {
				if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
					try {
						e._nesting++, e.onMicrotaskEmpty.emit(null);
					} finally {
						if ((e._nesting--, !e.hasPendingMicrotasks))
							try {
								e.runOutsideAngular(() => e.onStable.emit(null));
							} finally {
								e.isStable = !0;
							}
					}
			}
			function Zl(e) {
				e.hasPendingMicrotasks = !!(
					e._hasPendingMicrotasks ||
					((e.shouldCoalesceEventChangeDetection ||
						e.shouldCoalesceRunChangeDetection) &&
						-1 !== e.lastRequestAnimationFrameId)
				);
			}
			function dv(e) {
				e._nesting++,
					e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
			}
			function fv(e) {
				e._nesting--, Ql(e);
			}
			class mS {
				constructor() {
					(this.hasPendingMicrotasks = !1),
						(this.hasPendingMacrotasks = !1),
						(this.isStable = !0),
						(this.onUnstable = new qe()),
						(this.onMicrotaskEmpty = new qe()),
						(this.onStable = new qe()),
						(this.onError = new qe());
				}
				run(t, n, r) {
					return t.apply(n, r);
				}
				runGuarded(t, n, r) {
					return t.apply(n, r);
				}
				runOutsideAngular(t) {
					return t();
				}
				runTask(t, n, r, i) {
					return t.apply(n, r);
				}
			}
			const hv = new F(""),
				Bs = new F("");
			let Xl,
				Kl = (() => {
					class e {
						constructor(n, r, i) {
							(this._ngZone = n),
								(this.registry = r),
								(this._pendingCount = 0),
								(this._isZoneStable = !0),
								(this._didWork = !1),
								(this._callbacks = []),
								(this.taskTrackingZone = null),
								Xl ||
									((function vS(e) {
										Xl = e;
									})(i),
									i.addToWindow(r)),
								this._watchAngularEvents(),
								n.run(() => {
									this.taskTrackingZone =
										typeof Zone > "u"
											? null
											: Zone.current.get("TaskTrackingZone");
								});
						}
						_watchAngularEvents() {
							this._ngZone.onUnstable.subscribe({
								next: () => {
									(this._didWork = !0), (this._isZoneStable = !1);
								},
							}),
								this._ngZone.runOutsideAngular(() => {
									this._ngZone.onStable.subscribe({
										next: () => {
											ve.assertNotInAngularZone(),
												Wl(() => {
													(this._isZoneStable = !0),
														this._runCallbacksIfReady();
												});
										},
									});
								});
						}
						increasePendingRequestCount() {
							return (
								(this._pendingCount += 1),
								(this._didWork = !0),
								this._pendingCount
							);
						}
						decreasePendingRequestCount() {
							if (((this._pendingCount -= 1), this._pendingCount < 0))
								throw new Error("pending async requests below zero");
							return this._runCallbacksIfReady(), this._pendingCount;
						}
						isStable() {
							return (
								this._isZoneStable &&
								0 === this._pendingCount &&
								!this._ngZone.hasPendingMacrotasks
							);
						}
						_runCallbacksIfReady() {
							if (this.isStable())
								Wl(() => {
									for (; 0 !== this._callbacks.length; ) {
										let n = this._callbacks.pop();
										clearTimeout(n.timeoutId), n.doneCb(this._didWork);
									}
									this._didWork = !1;
								});
							else {
								let n = this.getPendingTasks();
								(this._callbacks = this._callbacks.filter(
									(r) =>
										!r.updateCb ||
										!r.updateCb(n) ||
										(clearTimeout(r.timeoutId), !1)
								)),
									(this._didWork = !0);
							}
						}
						getPendingTasks() {
							return this.taskTrackingZone
								? this.taskTrackingZone.macroTasks.map((n) => ({
										source: n.source,
										creationLocation: n.creationLocation,
										data: n.data,
								  }))
								: [];
						}
						addCallback(n, r, i) {
							let o = -1;
							r &&
								r > 0 &&
								(o = setTimeout(() => {
									(this._callbacks = this._callbacks.filter(
										(s) => s.timeoutId !== o
									)),
										n(this._didWork, this.getPendingTasks());
								}, r)),
								this._callbacks.push({ doneCb: n, timeoutId: o, updateCb: i });
						}
						whenStable(n, r, i) {
							if (i && !this.taskTrackingZone)
								throw new Error(
									'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
								);
							this.addCallback(n, r, i), this._runCallbacksIfReady();
						}
						getPendingRequestCount() {
							return this._pendingCount;
						}
						registerApplication(n) {
							this.registry.registerApplication(n, this);
						}
						unregisterApplication(n) {
							this.registry.unregisterApplication(n);
						}
						findProviders(n, r, i) {
							return [];
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(S(ve), S(Yl), S(Bs));
						}),
						(e.ɵprov = k({ token: e, factory: e.ɵfac })),
						e
					);
				})(),
				Yl = (() => {
					class e {
						constructor() {
							this._applications = new Map();
						}
						registerApplication(n, r) {
							this._applications.set(n, r);
						}
						unregisterApplication(n) {
							this._applications.delete(n);
						}
						unregisterAllApplications() {
							this._applications.clear();
						}
						getTestability(n) {
							return this._applications.get(n) || null;
						}
						getAllTestabilities() {
							return Array.from(this._applications.values());
						}
						getAllRootElements() {
							return Array.from(this._applications.keys());
						}
						findTestabilityInTree(n, r = !0) {
							return Xl?.findTestabilityInTree(this, n, r) ?? null;
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)();
						}),
						(e.ɵprov = k({
							token: e,
							factory: e.ɵfac,
							providedIn: "platform",
						})),
						e
					);
				})(),
				gn = null;
			const pv = new F("AllowMultipleToken"),
				Jl = new F("PlatformDestroyListeners");
			class gv {
				constructor(t, n) {
					(this.name = t), (this.token = n);
				}
			}
			function vv(e, t, n = []) {
				const r = `Platform: ${t}`,
					i = new F(r);
				return (o = []) => {
					let s = ec();
					if (!s || s.injector.get(pv, !1)) {
						const a = [...n, ...o, { provide: i, useValue: !0 }];
						e
							? e(a)
							: (function CS(e) {
									if (gn && !gn.get(pv, !1)) throw new w(400, !1);
									gn = e;
									const t = e.get(_v);
									(function mv(e) {
										const t = e.get(ov, null);
										t && t.forEach((n) => n());
									})(e);
							  })(
									(function yv(e = [], t) {
										return Nt.create({
											name: t,
											providers: [
												{ provide: qu, useValue: "platform" },
												{ provide: Jl, useValue: new Set([() => (gn = null)]) },
												...e,
											],
										});
									})(a, r)
							  );
					}
					return (function wS(e) {
						const t = ec();
						if (!t) throw new w(401, !1);
						return t;
					})();
				};
			}
			function ec() {
				return gn?.get(_v) ?? null;
			}
			let _v = (() => {
				class e {
					constructor(n) {
						(this._injector = n),
							(this._modules = []),
							(this._destroyListeners = []),
							(this._destroyed = !1);
					}
					bootstrapModuleFactory(n, r) {
						const i = (function Dv(e, t) {
								let n;
								return (
									(n =
										"noop" === e
											? new mS()
											: ("zone.js" === e ? void 0 : e) || new ve(t)),
									n
								);
							})(
								r?.ngZone,
								(function Cv(e) {
									return {
										enableLongStackTrace: !1,
										shouldCoalesceEventChangeDetection:
											!(!e || !e.ngZoneEventCoalescing) || !1,
										shouldCoalesceRunChangeDetection:
											!(!e || !e.ngZoneRunCoalescing) || !1,
									};
								})(r)
							),
							o = [{ provide: ve, useValue: i }];
						return i.run(() => {
							const s = Nt.create({
									providers: o,
									parent: this.injector,
									name: n.moduleType.name,
								}),
								a = n.create(s),
								u = a.injector.get(vr, null);
							if (!u) throw new w(402, !1);
							return (
								i.runOutsideAngular(() => {
									const l = i.onError.subscribe({
										next: (c) => {
											u.handleError(c);
										},
									});
									a.onDestroy(() => {
										zs(this._modules, a), l.unsubscribe();
									});
								}),
								(function wv(e, t, n) {
									try {
										const r = n();
										return Ps(r)
											? r.catch((i) => {
													throw (
														(t.runOutsideAngular(() => e.handleError(i)), i)
													);
											  })
											: r;
									} catch (r) {
										throw (t.runOutsideAngular(() => e.handleError(r)), r);
									}
								})(u, i, () => {
									const l = a.injector.get(Us);
									return (
										l.runInitializers(),
										l.donePromise.then(
											() => (
												(function Hg(e) {
													at(e, "Expected localeId to be defined"),
														"string" == typeof e &&
															(Bg = e.toLowerCase().replace(/_/g, "-"));
												})(a.injector.get(nn, Rr) || Rr),
												this._moduleDoBootstrap(a),
												a
											)
										)
									);
								})
							);
						});
					}
					bootstrapModule(n, r = []) {
						const i = bv({}, r);
						return (function yS(e, t, n) {
							const r = new xl(n);
							return Promise.resolve(r);
						})(0, 0, n).then((o) => this.bootstrapModuleFactory(o, i));
					}
					_moduleDoBootstrap(n) {
						const r = n.injector.get(Hs);
						if (n._bootstrapComponents.length > 0)
							n._bootstrapComponents.forEach((i) => r.bootstrap(i));
						else {
							if (!n.instance.ngDoBootstrap) throw new w(403, !1);
							n.instance.ngDoBootstrap(r);
						}
						this._modules.push(n);
					}
					onDestroy(n) {
						this._destroyListeners.push(n);
					}
					get injector() {
						return this._injector;
					}
					destroy() {
						if (this._destroyed) throw new w(404, !1);
						this._modules.slice().forEach((r) => r.destroy()),
							this._destroyListeners.forEach((r) => r());
						const n = this._injector.get(Jl, null);
						n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
					}
					get destroyed() {
						return this._destroyed;
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(S(Nt));
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "platform" })),
					e
				);
			})();
			function bv(e, t) {
				return Array.isArray(t) ? t.reduce(bv, e) : { ...e, ...t };
			}
			let Hs = (() => {
				class e {
					constructor(n, r, i) {
						(this._zone = n),
							(this._injector = r),
							(this._exceptionHandler = i),
							(this._bootstrapListeners = []),
							(this._views = []),
							(this._runningTick = !1),
							(this._stable = !0),
							(this._destroyed = !1),
							(this._destroyListeners = []),
							(this.componentTypes = []),
							(this.components = []),
							(this._onMicrotaskEmptySubscription =
								this._zone.onMicrotaskEmpty.subscribe({
									next: () => {
										this._zone.run(() => {
											this.tick();
										});
									},
								}));
						const o = new Ce((a) => {
								(this._stable =
									this._zone.isStable &&
									!this._zone.hasPendingMacrotasks &&
									!this._zone.hasPendingMicrotasks),
									this._zone.runOutsideAngular(() => {
										a.next(this._stable), a.complete();
									});
							}),
							s = new Ce((a) => {
								let u;
								this._zone.runOutsideAngular(() => {
									u = this._zone.onStable.subscribe(() => {
										ve.assertNotInAngularZone(),
											Wl(() => {
												!this._stable &&
													!this._zone.hasPendingMacrotasks &&
													!this._zone.hasPendingMicrotasks &&
													((this._stable = !0), a.next(!0));
											});
									});
								});
								const l = this._zone.onUnstable.subscribe(() => {
									ve.assertInAngularZone(),
										this._stable &&
											((this._stable = !1),
											this._zone.runOutsideAngular(() => {
												a.next(!1);
											}));
								});
								return () => {
									u.unsubscribe(), l.unsubscribe();
								};
							});
						this.isStable = (function bC(...e) {
							const t = ri(e),
								n = (function mC(e, t) {
									return "number" == typeof Ra(e) ? e.pop() : t;
								})(e, 1 / 0),
								r = e;
							return r.length
								? 1 === r.length
									? Pt(r[0])
									: Kn(n)(De(r, t))
								: Ht;
						})(
							o,
							s.pipe(
								(function MC(e = {}) {
									const {
										connector: t = () => new Ut(),
										resetOnError: n = !0,
										resetOnComplete: r = !0,
										resetOnRefCountZero: i = !0,
									} = e;
									return (o) => {
										let s,
											a,
											u,
											l = 0,
											c = !1,
											d = !1;
										const f = () => {
												a?.unsubscribe(), (a = void 0);
											},
											h = () => {
												f(), (s = u = void 0), (c = d = !1);
											},
											p = () => {
												const g = s;
												h(), g?.unsubscribe();
											};
										return Ie((g, y) => {
											l++, !d && !c && f();
											const _ = (u = u ?? t());
											y.add(() => {
												l--, 0 === l && !d && !c && (a = Na(p, i));
											}),
												_.subscribe(y),
												!s &&
													l > 0 &&
													((s = new ni({
														next: (M) => _.next(M),
														error: (M) => {
															(d = !0), f(), (a = Na(h, n, M)), _.error(M);
														},
														complete: () => {
															(c = !0), f(), (a = Na(h, r)), _.complete();
														},
													})),
													Pt(g).subscribe(s));
										})(o);
									};
								})()
							)
						);
					}
					get destroyed() {
						return this._destroyed;
					}
					get injector() {
						return this._injector;
					}
					bootstrap(n, r) {
						const i = n instanceof qh;
						if (!this._injector.get(Us).done)
							throw (
								(!i &&
									(function Xn(e) {
										const t = ee(e) || Re(e) || $e(e);
										return null !== t && t.standalone;
									})(n),
								new w(405, false))
							);
						let s;
						(s = i ? n : this._injector.get(Pi).resolveComponentFactory(n)),
							this.componentTypes.push(s.componentType);
						const a = (function _S(e) {
								return e.isBoundToModule;
							})(s)
								? void 0
								: this._injector.get(Nr),
							l = s.create(Nt.NULL, [], r || s.selector, a),
							c = l.location.nativeElement,
							d = l.injector.get(hv, null);
						return (
							d?.registerApplication(c),
							l.onDestroy(() => {
								this.detachView(l.hostView),
									zs(this.components, l),
									d?.unregisterApplication(c);
							}),
							this._loadComponent(l),
							l
						);
					}
					tick() {
						if (this._runningTick) throw new w(101, !1);
						try {
							this._runningTick = !0;
							for (let n of this._views) n.detectChanges();
						} catch (n) {
							this._zone.runOutsideAngular(() =>
								this._exceptionHandler.handleError(n)
							);
						} finally {
							this._runningTick = !1;
						}
					}
					attachView(n) {
						const r = n;
						this._views.push(r), r.attachToAppRef(this);
					}
					detachView(n) {
						const r = n;
						zs(this._views, r), r.detachFromAppRef();
					}
					_loadComponent(n) {
						this.attachView(n.hostView), this.tick(), this.components.push(n);
						const r = this._injector.get(av, []);
						r.push(...this._bootstrapListeners), r.forEach((i) => i(n));
					}
					ngOnDestroy() {
						if (!this._destroyed)
							try {
								this._destroyListeners.forEach((n) => n()),
									this._views.slice().forEach((n) => n.destroy()),
									this._onMicrotaskEmptySubscription.unsubscribe();
							} finally {
								(this._destroyed = !0),
									(this._views = []),
									(this._bootstrapListeners = []),
									(this._destroyListeners = []);
							}
					}
					onDestroy(n) {
						return (
							this._destroyListeners.push(n),
							() => zs(this._destroyListeners, n)
						);
					}
					destroy() {
						if (this._destroyed) throw new w(406, !1);
						const n = this._injector;
						n.destroy && !n.destroyed && n.destroy();
					}
					get viewCount() {
						return this._views.length;
					}
					warnIfDestroyed() {}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(S(ve), S(Yt), S(vr));
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
					e
				);
			})();
			function zs(e, t) {
				const n = e.indexOf(t);
				n > -1 && e.splice(n, 1);
			}
			let tc = (() => {
				class e {}
				return (e.__NG_ELEMENT_ID__ = MS), e;
			})();
			function MS(e) {
				return (function ES(e, t, n) {
					if (di(e) && !n) {
						const r = rt(e.index, t);
						return new Oi(r, r);
					}
					return 47 & e.type ? new Oi(t[16], t) : null;
				})(Oe(), v(), 16 == (16 & e));
			}
			class Pv {
				constructor() {}
				supports(t) {
					return xi(t);
				}
				create(t) {
					return new AS(t);
				}
			}
			const OS = (e, t) => t;
			class AS {
				constructor(t) {
					(this.length = 0),
						(this._linkedRecords = null),
						(this._unlinkedRecords = null),
						(this._previousItHead = null),
						(this._itHead = null),
						(this._itTail = null),
						(this._additionsHead = null),
						(this._additionsTail = null),
						(this._movesHead = null),
						(this._movesTail = null),
						(this._removalsHead = null),
						(this._removalsTail = null),
						(this._identityChangesHead = null),
						(this._identityChangesTail = null),
						(this._trackByFn = t || OS);
				}
				forEachItem(t) {
					let n;
					for (n = this._itHead; null !== n; n = n._next) t(n);
				}
				forEachOperation(t) {
					let n = this._itHead,
						r = this._removalsHead,
						i = 0,
						o = null;
					for (; n || r; ) {
						const s = !r || (n && n.currentIndex < Ov(r, i, o)) ? n : r,
							a = Ov(s, i, o),
							u = s.currentIndex;
						if (s === r) i--, (r = r._nextRemoved);
						else if (((n = n._next), null == s.previousIndex)) i++;
						else {
							o || (o = []);
							const l = a - i,
								c = u - i;
							if (l != c) {
								for (let f = 0; f < l; f++) {
									const h = f < o.length ? o[f] : (o[f] = 0),
										p = h + f;
									c <= p && p < l && (o[f] = h + 1);
								}
								o[s.previousIndex] = c - l;
							}
						}
						a !== u && t(s, a, u);
					}
				}
				forEachPreviousItem(t) {
					let n;
					for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
				}
				forEachAddedItem(t) {
					let n;
					for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
				}
				forEachMovedItem(t) {
					let n;
					for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
				}
				forEachRemovedItem(t) {
					let n;
					for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
				}
				forEachIdentityChange(t) {
					let n;
					for (
						n = this._identityChangesHead;
						null !== n;
						n = n._nextIdentityChange
					)
						t(n);
				}
				diff(t) {
					if ((null == t && (t = []), !xi(t))) throw new w(900, !1);
					return this.check(t) ? this : null;
				}
				onDestroy() {}
				check(t) {
					this._reset();
					let i,
						o,
						s,
						n = this._itHead,
						r = !1;
					if (Array.isArray(t)) {
						this.length = t.length;
						for (let a = 0; a < this.length; a++)
							(o = t[a]),
								(s = this._trackByFn(a, o)),
								null !== n && Object.is(n.trackById, s)
									? (r && (n = this._verifyReinsertion(n, o, s, a)),
									  Object.is(n.item, o) || this._addIdentityChange(n, o))
									: ((n = this._mismatch(n, o, s, a)), (r = !0)),
								(n = n._next);
					} else
						(i = 0),
							(function tM(e, t) {
								if (Array.isArray(e))
									for (let n = 0; n < e.length; n++) t(e[n]);
								else {
									const n = e[Fn()]();
									let r;
									for (; !(r = n.next()).done; ) t(r.value);
								}
							})(t, (a) => {
								(s = this._trackByFn(i, a)),
									null !== n && Object.is(n.trackById, s)
										? (r && (n = this._verifyReinsertion(n, a, s, i)),
										  Object.is(n.item, a) || this._addIdentityChange(n, a))
										: ((n = this._mismatch(n, a, s, i)), (r = !0)),
									(n = n._next),
									i++;
							}),
							(this.length = i);
					return this._truncate(n), (this.collection = t), this.isDirty;
				}
				get isDirty() {
					return (
						null !== this._additionsHead ||
						null !== this._movesHead ||
						null !== this._removalsHead ||
						null !== this._identityChangesHead
					);
				}
				_reset() {
					if (this.isDirty) {
						let t;
						for (
							t = this._previousItHead = this._itHead;
							null !== t;
							t = t._next
						)
							t._nextPrevious = t._next;
						for (t = this._additionsHead; null !== t; t = t._nextAdded)
							t.previousIndex = t.currentIndex;
						for (
							this._additionsHead = this._additionsTail = null,
								t = this._movesHead;
							null !== t;
							t = t._nextMoved
						)
							t.previousIndex = t.currentIndex;
						(this._movesHead = this._movesTail = null),
							(this._removalsHead = this._removalsTail = null),
							(this._identityChangesHead = this._identityChangesTail = null);
					}
				}
				_mismatch(t, n, r, i) {
					let o;
					return (
						null === t ? (o = this._itTail) : ((o = t._prev), this._remove(t)),
						null !==
						(t =
							null === this._unlinkedRecords
								? null
								: this._unlinkedRecords.get(r, null))
							? (Object.is(t.item, n) || this._addIdentityChange(t, n),
							  this._reinsertAfter(t, o, i))
							: null !==
							  (t =
									null === this._linkedRecords
										? null
										: this._linkedRecords.get(r, i))
							? (Object.is(t.item, n) || this._addIdentityChange(t, n),
							  this._moveAfter(t, o, i))
							: (t = this._addAfter(new xS(n, r), o, i)),
						t
					);
				}
				_verifyReinsertion(t, n, r, i) {
					let o =
						null === this._unlinkedRecords
							? null
							: this._unlinkedRecords.get(r, null);
					return (
						null !== o
							? (t = this._reinsertAfter(o, t._prev, i))
							: t.currentIndex != i &&
							  ((t.currentIndex = i), this._addToMoves(t, i)),
						t
					);
				}
				_truncate(t) {
					for (; null !== t; ) {
						const n = t._next;
						this._addToRemovals(this._unlink(t)), (t = n);
					}
					null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
						null !== this._additionsTail &&
							(this._additionsTail._nextAdded = null),
						null !== this._movesTail && (this._movesTail._nextMoved = null),
						null !== this._itTail && (this._itTail._next = null),
						null !== this._removalsTail &&
							(this._removalsTail._nextRemoved = null),
						null !== this._identityChangesTail &&
							(this._identityChangesTail._nextIdentityChange = null);
				}
				_reinsertAfter(t, n, r) {
					null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
					const i = t._prevRemoved,
						o = t._nextRemoved;
					return (
						null === i ? (this._removalsHead = o) : (i._nextRemoved = o),
						null === o ? (this._removalsTail = i) : (o._prevRemoved = i),
						this._insertAfter(t, n, r),
						this._addToMoves(t, r),
						t
					);
				}
				_moveAfter(t, n, r) {
					return (
						this._unlink(t),
						this._insertAfter(t, n, r),
						this._addToMoves(t, r),
						t
					);
				}
				_addAfter(t, n, r) {
					return (
						this._insertAfter(t, n, r),
						(this._additionsTail =
							null === this._additionsTail
								? (this._additionsHead = t)
								: (this._additionsTail._nextAdded = t)),
						t
					);
				}
				_insertAfter(t, n, r) {
					const i = null === n ? this._itHead : n._next;
					return (
						(t._next = i),
						(t._prev = n),
						null === i ? (this._itTail = t) : (i._prev = t),
						null === n ? (this._itHead = t) : (n._next = t),
						null === this._linkedRecords && (this._linkedRecords = new Tv()),
						this._linkedRecords.put(t),
						(t.currentIndex = r),
						t
					);
				}
				_remove(t) {
					return this._addToRemovals(this._unlink(t));
				}
				_unlink(t) {
					null !== this._linkedRecords && this._linkedRecords.remove(t);
					const n = t._prev,
						r = t._next;
					return (
						null === n ? (this._itHead = r) : (n._next = r),
						null === r ? (this._itTail = n) : (r._prev = n),
						t
					);
				}
				_addToMoves(t, n) {
					return (
						t.previousIndex === n ||
							(this._movesTail =
								null === this._movesTail
									? (this._movesHead = t)
									: (this._movesTail._nextMoved = t)),
						t
					);
				}
				_addToRemovals(t) {
					return (
						null === this._unlinkedRecords &&
							(this._unlinkedRecords = new Tv()),
						this._unlinkedRecords.put(t),
						(t.currentIndex = null),
						(t._nextRemoved = null),
						null === this._removalsTail
							? ((this._removalsTail = this._removalsHead = t),
							  (t._prevRemoved = null))
							: ((t._prevRemoved = this._removalsTail),
							  (this._removalsTail = this._removalsTail._nextRemoved = t)),
						t
					);
				}
				_addIdentityChange(t, n) {
					return (
						(t.item = n),
						(this._identityChangesTail =
							null === this._identityChangesTail
								? (this._identityChangesHead = t)
								: (this._identityChangesTail._nextIdentityChange = t)),
						t
					);
				}
			}
			class xS {
				constructor(t, n) {
					(this.item = t),
						(this.trackById = n),
						(this.currentIndex = null),
						(this.previousIndex = null),
						(this._nextPrevious = null),
						(this._prev = null),
						(this._next = null),
						(this._prevDup = null),
						(this._nextDup = null),
						(this._prevRemoved = null),
						(this._nextRemoved = null),
						(this._nextAdded = null),
						(this._nextMoved = null),
						(this._nextIdentityChange = null);
				}
			}
			class RS {
				constructor() {
					(this._head = null), (this._tail = null);
				}
				add(t) {
					null === this._head
						? ((this._head = this._tail = t),
						  (t._nextDup = null),
						  (t._prevDup = null))
						: ((this._tail._nextDup = t),
						  (t._prevDup = this._tail),
						  (t._nextDup = null),
						  (this._tail = t));
				}
				get(t, n) {
					let r;
					for (r = this._head; null !== r; r = r._nextDup)
						if (
							(null === n || n <= r.currentIndex) &&
							Object.is(r.trackById, t)
						)
							return r;
					return null;
				}
				remove(t) {
					const n = t._prevDup,
						r = t._nextDup;
					return (
						null === n ? (this._head = r) : (n._nextDup = r),
						null === r ? (this._tail = n) : (r._prevDup = n),
						null === this._head
					);
				}
			}
			class Tv {
				constructor() {
					this.map = new Map();
				}
				put(t) {
					const n = t.trackById;
					let r = this.map.get(n);
					r || ((r = new RS()), this.map.set(n, r)), r.add(t);
				}
				get(t, n) {
					const i = this.map.get(t);
					return i ? i.get(t, n) : null;
				}
				remove(t) {
					const n = t.trackById;
					return this.map.get(n).remove(t) && this.map.delete(n), t;
				}
				get isEmpty() {
					return 0 === this.map.size;
				}
				clear() {
					this.map.clear();
				}
			}
			function Ov(e, t, n) {
				const r = e.previousIndex;
				if (null === r) return r;
				let i = 0;
				return n && r < n.length && (i = n[r]), r + t + i;
			}
			class Av {
				constructor() {}
				supports(t) {
					return t instanceof Map || ml(t);
				}
				create() {
					return new NS();
				}
			}
			class NS {
				constructor() {
					(this._records = new Map()),
						(this._mapHead = null),
						(this._appendAfter = null),
						(this._previousMapHead = null),
						(this._changesHead = null),
						(this._changesTail = null),
						(this._additionsHead = null),
						(this._additionsTail = null),
						(this._removalsHead = null),
						(this._removalsTail = null);
				}
				get isDirty() {
					return (
						null !== this._additionsHead ||
						null !== this._changesHead ||
						null !== this._removalsHead
					);
				}
				forEachItem(t) {
					let n;
					for (n = this._mapHead; null !== n; n = n._next) t(n);
				}
				forEachPreviousItem(t) {
					let n;
					for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
				}
				forEachChangedItem(t) {
					let n;
					for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
				}
				forEachAddedItem(t) {
					let n;
					for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
				}
				forEachRemovedItem(t) {
					let n;
					for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
				}
				diff(t) {
					if (t) {
						if (!(t instanceof Map || ml(t))) throw new w(900, !1);
					} else t = new Map();
					return this.check(t) ? this : null;
				}
				onDestroy() {}
				check(t) {
					this._reset();
					let n = this._mapHead;
					if (
						((this._appendAfter = null),
						this._forEach(t, (r, i) => {
							if (n && n.key === i)
								this._maybeAddToChanges(n, r),
									(this._appendAfter = n),
									(n = n._next);
							else {
								const o = this._getOrCreateRecordForKey(i, r);
								n = this._insertBeforeOrAppend(n, o);
							}
						}),
						n)
					) {
						n._prev && (n._prev._next = null), (this._removalsHead = n);
						for (let r = n; null !== r; r = r._nextRemoved)
							r === this._mapHead && (this._mapHead = null),
								this._records.delete(r.key),
								(r._nextRemoved = r._next),
								(r.previousValue = r.currentValue),
								(r.currentValue = null),
								(r._prev = null),
								(r._next = null);
					}
					return (
						this._changesTail && (this._changesTail._nextChanged = null),
						this._additionsTail && (this._additionsTail._nextAdded = null),
						this.isDirty
					);
				}
				_insertBeforeOrAppend(t, n) {
					if (t) {
						const r = t._prev;
						return (
							(n._next = t),
							(n._prev = r),
							(t._prev = n),
							r && (r._next = n),
							t === this._mapHead && (this._mapHead = n),
							(this._appendAfter = t),
							t
						);
					}
					return (
						this._appendAfter
							? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
							: (this._mapHead = n),
						(this._appendAfter = n),
						null
					);
				}
				_getOrCreateRecordForKey(t, n) {
					if (this._records.has(t)) {
						const i = this._records.get(t);
						this._maybeAddToChanges(i, n);
						const o = i._prev,
							s = i._next;
						return (
							o && (o._next = s),
							s && (s._prev = o),
							(i._next = null),
							(i._prev = null),
							i
						);
					}
					const r = new FS(t);
					return (
						this._records.set(t, r),
						(r.currentValue = n),
						this._addToAdditions(r),
						r
					);
				}
				_reset() {
					if (this.isDirty) {
						let t;
						for (
							this._previousMapHead = this._mapHead, t = this._previousMapHead;
							null !== t;
							t = t._next
						)
							t._nextPrevious = t._next;
						for (t = this._changesHead; null !== t; t = t._nextChanged)
							t.previousValue = t.currentValue;
						for (t = this._additionsHead; null != t; t = t._nextAdded)
							t.previousValue = t.currentValue;
						(this._changesHead = this._changesTail = null),
							(this._additionsHead = this._additionsTail = null),
							(this._removalsHead = null);
					}
				}
				_maybeAddToChanges(t, n) {
					Object.is(n, t.currentValue) ||
						((t.previousValue = t.currentValue),
						(t.currentValue = n),
						this._addToChanges(t));
				}
				_addToAdditions(t) {
					null === this._additionsHead
						? (this._additionsHead = this._additionsTail = t)
						: ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
				}
				_addToChanges(t) {
					null === this._changesHead
						? (this._changesHead = this._changesTail = t)
						: ((this._changesTail._nextChanged = t), (this._changesTail = t));
				}
				_forEach(t, n) {
					t instanceof Map
						? t.forEach(n)
						: Object.keys(t).forEach((r) => n(t[r], r));
				}
			}
			class FS {
				constructor(t) {
					(this.key = t),
						(this.previousValue = null),
						(this.currentValue = null),
						(this._nextPrevious = null),
						(this._next = null),
						(this._prev = null),
						(this._nextAdded = null),
						(this._nextRemoved = null),
						(this._nextChanged = null);
				}
			}
			function xv() {
				return new Ws([new Pv()]);
			}
			let Ws = (() => {
				class e {
					constructor(n) {
						this.factories = n;
					}
					static create(n, r) {
						if (null != r) {
							const i = r.factories.slice();
							n = n.concat(i);
						}
						return new e(n);
					}
					static extend(n) {
						return {
							provide: e,
							useFactory: (r) => e.create(n, r || xv()),
							deps: [[e, new _i(), new yi()]],
						};
					}
					find(n) {
						const r = this.factories.find((i) => i.supports(n));
						if (null != r) return r;
						throw new w(901, !1);
					}
				}
				return (e.ɵprov = k({ token: e, providedIn: "root", factory: xv })), e;
			})();
			function Rv() {
				return new Gi([new Av()]);
			}
			let Gi = (() => {
				class e {
					constructor(n) {
						this.factories = n;
					}
					static create(n, r) {
						if (r) {
							const i = r.factories.slice();
							n = n.concat(i);
						}
						return new e(n);
					}
					static extend(n) {
						return {
							provide: e,
							useFactory: (r) => e.create(n, r || Rv()),
							deps: [[e, new _i(), new yi()]],
						};
					}
					find(n) {
						const r = this.factories.find((i) => i.supports(n));
						if (r) return r;
						throw new w(901, !1);
					}
				}
				return (e.ɵprov = k({ token: e, providedIn: "root", factory: Rv })), e;
			})();
			const jS = vv(null, "core", []);
			let VS = (() => {
				class e {
					constructor(n) {}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(S(Hs));
					}),
					(e.ɵmod = Gt({ type: e })),
					(e.ɵinj = Tt({})),
					e
				);
			})();
			function sc(e) {
				return "boolean" == typeof e ? e : null != e && "false" !== e;
			}
			let ac = null;
			function mn() {
				return ac;
			}
			class BS {}
			const Ke = new F("DocumentToken");
			let uc = (() => {
				class e {
					historyGo(n) {
						throw new Error("Not implemented");
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)();
					}),
					(e.ɵprov = k({
						token: e,
						factory: function () {
							return (function HS() {
								return S(Nv);
							})();
						},
						providedIn: "platform",
					})),
					e
				);
			})();
			const zS = new F("Location Initialized");
			let Nv = (() => {
				class e extends uc {
					constructor(n) {
						super(), (this._doc = n), this._init();
					}
					_init() {
						(this.location = window.location), (this._history = window.history);
					}
					getBaseHrefFromDOM() {
						return mn().getBaseHref(this._doc);
					}
					onPopState(n) {
						const r = mn().getGlobalEventTarget(this._doc, "window");
						return (
							r.addEventListener("popstate", n, !1),
							() => r.removeEventListener("popstate", n)
						);
					}
					onHashChange(n) {
						const r = mn().getGlobalEventTarget(this._doc, "window");
						return (
							r.addEventListener("hashchange", n, !1),
							() => r.removeEventListener("hashchange", n)
						);
					}
					get href() {
						return this.location.href;
					}
					get protocol() {
						return this.location.protocol;
					}
					get hostname() {
						return this.location.hostname;
					}
					get port() {
						return this.location.port;
					}
					get pathname() {
						return this.location.pathname;
					}
					get search() {
						return this.location.search;
					}
					get hash() {
						return this.location.hash;
					}
					set pathname(n) {
						this.location.pathname = n;
					}
					pushState(n, r, i) {
						Fv() ? this._history.pushState(n, r, i) : (this.location.hash = i);
					}
					replaceState(n, r, i) {
						Fv()
							? this._history.replaceState(n, r, i)
							: (this.location.hash = i);
					}
					forward() {
						this._history.forward();
					}
					back() {
						this._history.back();
					}
					historyGo(n = 0) {
						this._history.go(n);
					}
					getState() {
						return this._history.state;
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(S(Ke));
					}),
					(e.ɵprov = k({
						token: e,
						factory: function () {
							return (function qS() {
								return new Nv(S(Ke));
							})();
						},
						providedIn: "platform",
					})),
					e
				);
			})();
			function Fv() {
				return !!window.history.pushState;
			}
			function lc(e, t) {
				if (0 == e.length) return t;
				if (0 == t.length) return e;
				let n = 0;
				return (
					e.endsWith("/") && n++,
					t.startsWith("/") && n++,
					2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
				);
			}
			function kv(e) {
				const t = e.match(/#|\?|$/),
					n = (t && t.index) || e.length;
				return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
			}
			function on(e) {
				return e && "?" !== e[0] ? "?" + e : e;
			}
			let $n = (() => {
				class e {
					historyGo(n) {
						throw new Error("Not implemented");
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)();
					}),
					(e.ɵprov = k({
						token: e,
						factory: function () {
							return Q(jv);
						},
						providedIn: "root",
					})),
					e
				);
			})();
			const Lv = new F("appBaseHref");
			let jv = (() => {
					class e extends $n {
						constructor(n, r) {
							super(),
								(this._platformLocation = n),
								(this._removeListenerFns = []),
								(this._baseHref =
									r ??
									this._platformLocation.getBaseHrefFromDOM() ??
									Q(Ke).location?.origin ??
									"");
						}
						ngOnDestroy() {
							for (; this._removeListenerFns.length; )
								this._removeListenerFns.pop()();
						}
						onPopState(n) {
							this._removeListenerFns.push(
								this._platformLocation.onPopState(n),
								this._platformLocation.onHashChange(n)
							);
						}
						getBaseHref() {
							return this._baseHref;
						}
						prepareExternalUrl(n) {
							return lc(this._baseHref, n);
						}
						path(n = !1) {
							const r =
									this._platformLocation.pathname +
									on(this._platformLocation.search),
								i = this._platformLocation.hash;
							return i && n ? `${r}${i}` : r;
						}
						pushState(n, r, i, o) {
							const s = this.prepareExternalUrl(i + on(o));
							this._platformLocation.pushState(n, r, s);
						}
						replaceState(n, r, i, o) {
							const s = this.prepareExternalUrl(i + on(o));
							this._platformLocation.replaceState(n, r, s);
						}
						forward() {
							this._platformLocation.forward();
						}
						back() {
							this._platformLocation.back();
						}
						getState() {
							return this._platformLocation.getState();
						}
						historyGo(n = 0) {
							this._platformLocation.historyGo?.(n);
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(S(uc), S(Lv, 8));
						}),
						(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
						e
					);
				})(),
				GS = (() => {
					class e extends $n {
						constructor(n, r) {
							super(),
								(this._platformLocation = n),
								(this._baseHref = ""),
								(this._removeListenerFns = []),
								null != r && (this._baseHref = r);
						}
						ngOnDestroy() {
							for (; this._removeListenerFns.length; )
								this._removeListenerFns.pop()();
						}
						onPopState(n) {
							this._removeListenerFns.push(
								this._platformLocation.onPopState(n),
								this._platformLocation.onHashChange(n)
							);
						}
						getBaseHref() {
							return this._baseHref;
						}
						path(n = !1) {
							let r = this._platformLocation.hash;
							return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
						}
						prepareExternalUrl(n) {
							const r = lc(this._baseHref, n);
							return r.length > 0 ? "#" + r : r;
						}
						pushState(n, r, i, o) {
							let s = this.prepareExternalUrl(i + on(o));
							0 == s.length && (s = this._platformLocation.pathname),
								this._platformLocation.pushState(n, r, s);
						}
						replaceState(n, r, i, o) {
							let s = this.prepareExternalUrl(i + on(o));
							0 == s.length && (s = this._platformLocation.pathname),
								this._platformLocation.replaceState(n, r, s);
						}
						forward() {
							this._platformLocation.forward();
						}
						back() {
							this._platformLocation.back();
						}
						getState() {
							return this._platformLocation.getState();
						}
						historyGo(n = 0) {
							this._platformLocation.historyGo?.(n);
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(S(uc), S(Lv, 8));
						}),
						(e.ɵprov = k({ token: e, factory: e.ɵfac })),
						e
					);
				})(),
				cc = (() => {
					class e {
						constructor(n) {
							(this._subject = new qe()),
								(this._urlChangeListeners = []),
								(this._urlChangeSubscription = null),
								(this._locationStrategy = n);
							const r = this._locationStrategy.getBaseHref();
							(this._basePath = (function ZS(e) {
								if (new RegExp("^(https?:)?//").test(e)) {
									const [, n] = e.split(/\/\/[^\/]+/);
									return n;
								}
								return e;
							})(kv(Vv(r)))),
								this._locationStrategy.onPopState((i) => {
									this._subject.emit({
										url: this.path(!0),
										pop: !0,
										state: i.state,
										type: i.type,
									});
								});
						}
						ngOnDestroy() {
							this._urlChangeSubscription?.unsubscribe(),
								(this._urlChangeListeners = []);
						}
						path(n = !1) {
							return this.normalize(this._locationStrategy.path(n));
						}
						getState() {
							return this._locationStrategy.getState();
						}
						isCurrentPathEqualTo(n, r = "") {
							return this.path() == this.normalize(n + on(r));
						}
						normalize(n) {
							return e.stripTrailingSlash(
								(function QS(e, t) {
									return e && t.startsWith(e) ? t.substring(e.length) : t;
								})(this._basePath, Vv(n))
							);
						}
						prepareExternalUrl(n) {
							return (
								n && "/" !== n[0] && (n = "/" + n),
								this._locationStrategy.prepareExternalUrl(n)
							);
						}
						go(n, r = "", i = null) {
							this._locationStrategy.pushState(i, "", n, r),
								this._notifyUrlChangeListeners(
									this.prepareExternalUrl(n + on(r)),
									i
								);
						}
						replaceState(n, r = "", i = null) {
							this._locationStrategy.replaceState(i, "", n, r),
								this._notifyUrlChangeListeners(
									this.prepareExternalUrl(n + on(r)),
									i
								);
						}
						forward() {
							this._locationStrategy.forward();
						}
						back() {
							this._locationStrategy.back();
						}
						historyGo(n = 0) {
							this._locationStrategy.historyGo?.(n);
						}
						onUrlChange(n) {
							return (
								this._urlChangeListeners.push(n),
								this._urlChangeSubscription ||
									(this._urlChangeSubscription = this.subscribe((r) => {
										this._notifyUrlChangeListeners(r.url, r.state);
									})),
								() => {
									const r = this._urlChangeListeners.indexOf(n);
									this._urlChangeListeners.splice(r, 1),
										0 === this._urlChangeListeners.length &&
											(this._urlChangeSubscription?.unsubscribe(),
											(this._urlChangeSubscription = null));
								}
							);
						}
						_notifyUrlChangeListeners(n = "", r) {
							this._urlChangeListeners.forEach((i) => i(n, r));
						}
						subscribe(n, r, i) {
							return this._subject.subscribe({
								next: n,
								error: r,
								complete: i,
							});
						}
					}
					return (
						(e.normalizeQueryParams = on),
						(e.joinWithSlash = lc),
						(e.stripTrailingSlash = kv),
						(e.ɵfac = function (n) {
							return new (n || e)(S($n));
						}),
						(e.ɵprov = k({
							token: e,
							factory: function () {
								return (function WS() {
									return new cc(S($n));
								})();
							},
							providedIn: "root",
						})),
						e
					);
				})();
			function Vv(e) {
				return e.replace(/\/index.html$/, "");
			}
			class FP {
				constructor(t, n, r, i) {
					(this.$implicit = t),
						(this.ngForOf = n),
						(this.index = r),
						(this.count = i);
				}
				get first() {
					return 0 === this.index;
				}
				get last() {
					return this.index === this.count - 1;
				}
				get even() {
					return this.index % 2 == 0;
				}
				get odd() {
					return !this.even;
				}
			}
			let Cc = (() => {
				class e {
					constructor(n, r, i) {
						(this._viewContainer = n),
							(this._template = r),
							(this._differs = i),
							(this._ngForOf = null),
							(this._ngForOfDirty = !0),
							(this._differ = null);
					}
					set ngForOf(n) {
						(this._ngForOf = n), (this._ngForOfDirty = !0);
					}
					set ngForTrackBy(n) {
						this._trackByFn = n;
					}
					get ngForTrackBy() {
						return this._trackByFn;
					}
					set ngForTemplate(n) {
						n && (this._template = n);
					}
					ngDoCheck() {
						if (this._ngForOfDirty) {
							this._ngForOfDirty = !1;
							const n = this._ngForOf;
							!this._differ &&
								n &&
								(this._differ = this._differs
									.find(n)
									.create(this.ngForTrackBy));
						}
						if (this._differ) {
							const n = this._differ.diff(this._ngForOf);
							n && this._applyChanges(n);
						}
					}
					_applyChanges(n) {
						const r = this._viewContainer;
						n.forEachOperation((i, o, s) => {
							if (null == i.previousIndex)
								r.createEmbeddedView(
									this._template,
									new FP(i.item, this._ngForOf, -1, -1),
									null === s ? void 0 : s
								);
							else if (null == s) r.remove(null === o ? void 0 : o);
							else if (null !== o) {
								const a = r.get(o);
								r.move(a, s), Kv(a, i);
							}
						});
						for (let i = 0, o = r.length; i < o; i++) {
							const a = r.get(i).context;
							(a.index = i), (a.count = o), (a.ngForOf = this._ngForOf);
						}
						n.forEachIdentityChange((i) => {
							Kv(r.get(i.currentIndex), i);
						});
					}
					static ngTemplateContextGuard(n, r) {
						return !0;
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(P(bt), P(tn), P(Ws));
					}),
					(e.ɵdir = Ve({
						type: e,
						selectors: [["", "ngFor", "", "ngForOf", ""]],
						inputs: {
							ngForOf: "ngForOf",
							ngForTrackBy: "ngForTrackBy",
							ngForTemplate: "ngForTemplate",
						},
						standalone: !0,
					})),
					e
				);
			})();
			function Kv(e, t) {
				e.context.$implicit = t.item;
			}
			let Yv = (() => {
				class e {
					constructor(n, r) {
						(this._viewContainer = n),
							(this._context = new LP()),
							(this._thenTemplateRef = null),
							(this._elseTemplateRef = null),
							(this._thenViewRef = null),
							(this._elseViewRef = null),
							(this._thenTemplateRef = r);
					}
					set ngIf(n) {
						(this._context.$implicit = this._context.ngIf = n),
							this._updateView();
					}
					set ngIfThen(n) {
						Xv("ngIfThen", n),
							(this._thenTemplateRef = n),
							(this._thenViewRef = null),
							this._updateView();
					}
					set ngIfElse(n) {
						Xv("ngIfElse", n),
							(this._elseTemplateRef = n),
							(this._elseViewRef = null),
							this._updateView();
					}
					_updateView() {
						this._context.$implicit
							? this._thenViewRef ||
							  (this._viewContainer.clear(),
							  (this._elseViewRef = null),
							  this._thenTemplateRef &&
									(this._thenViewRef = this._viewContainer.createEmbeddedView(
										this._thenTemplateRef,
										this._context
									)))
							: this._elseViewRef ||
							  (this._viewContainer.clear(),
							  (this._thenViewRef = null),
							  this._elseTemplateRef &&
									(this._elseViewRef = this._viewContainer.createEmbeddedView(
										this._elseTemplateRef,
										this._context
									)));
					}
					static ngTemplateContextGuard(n, r) {
						return !0;
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(P(bt), P(tn));
					}),
					(e.ɵdir = Ve({
						type: e,
						selectors: [["", "ngIf", ""]],
						inputs: {
							ngIf: "ngIf",
							ngIfThen: "ngIfThen",
							ngIfElse: "ngIfElse",
						},
						standalone: !0,
					})),
					e
				);
			})();
			class LP {
				constructor() {
					(this.$implicit = null), (this.ngIf = null);
				}
			}
			function Xv(e, t) {
				if (t && !t.createEmbeddedView)
					throw new Error(
						`${e} must be a TemplateRef, but received '${ne(t)}'.`
					);
			}
			let ey = (() => {
					class e {
						constructor(n, r, i) {
							(this._ngEl = n),
								(this._differs = r),
								(this._renderer = i),
								(this._ngStyle = null),
								(this._differ = null);
						}
						set ngStyle(n) {
							(this._ngStyle = n),
								!this._differ &&
									n &&
									(this._differ = this._differs.find(n).create());
						}
						ngDoCheck() {
							if (this._differ) {
								const n = this._differ.diff(this._ngStyle);
								n && this._applyChanges(n);
							}
						}
						_setStyle(n, r) {
							const [i, o] = n.split("."),
								s = -1 === i.indexOf("-") ? void 0 : Qe.DashCase;
							null != r
								? this._renderer.setStyle(
										this._ngEl.nativeElement,
										i,
										o ? `${r}${o}` : r,
										s
								  )
								: this._renderer.removeStyle(this._ngEl.nativeElement, i, s);
						}
						_applyChanges(n) {
							n.forEachRemovedItem((r) => this._setStyle(r.key, null)),
								n.forEachAddedItem((r) =>
									this._setStyle(r.key, r.currentValue)
								),
								n.forEachChangedItem((r) =>
									this._setStyle(r.key, r.currentValue)
								);
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(P(hn), P(Gi), P(vs));
						}),
						(e.ɵdir = Ve({
							type: e,
							selectors: [["", "ngStyle", ""]],
							inputs: { ngStyle: "ngStyle" },
							standalone: !0,
						})),
						e
					);
				})(),
				Ec = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)();
						}),
						(e.ɵmod = Gt({ type: e })),
						(e.ɵinj = Tt({})),
						e
					);
				})();
			let pT = (() => {
				class e {}
				return (
					(e.ɵprov = k({
						token: e,
						providedIn: "root",
						factory: () => new gT(S(Ke), window),
					})),
					e
				);
			})();
			class gT {
				constructor(t, n) {
					(this.document = t), (this.window = n), (this.offset = () => [0, 0]);
				}
				setOffset(t) {
					this.offset = Array.isArray(t) ? () => t : t;
				}
				getScrollPosition() {
					return this.supportsScrolling()
						? [this.window.pageXOffset, this.window.pageYOffset]
						: [0, 0];
				}
				scrollToPosition(t) {
					this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
				}
				scrollToAnchor(t) {
					if (!this.supportsScrolling()) return;
					const n = (function mT(e, t) {
						const n = e.getElementById(t) || e.getElementsByName(t)[0];
						if (n) return n;
						if (
							"function" == typeof e.createTreeWalker &&
							e.body &&
							(e.body.createShadowRoot || e.body.attachShadow)
						) {
							const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
							let i = r.currentNode;
							for (; i; ) {
								const o = i.shadowRoot;
								if (o) {
									const s =
										o.getElementById(t) || o.querySelector(`[name="${t}"]`);
									if (s) return s;
								}
								i = r.nextNode();
							}
						}
						return null;
					})(this.document, t);
					n && (this.scrollToElement(n), n.focus());
				}
				setHistoryScrollRestoration(t) {
					if (this.supportScrollRestoration()) {
						const n = this.window.history;
						n && n.scrollRestoration && (n.scrollRestoration = t);
					}
				}
				scrollToElement(t) {
					const n = t.getBoundingClientRect(),
						r = n.left + this.window.pageXOffset,
						i = n.top + this.window.pageYOffset,
						o = this.offset();
					this.window.scrollTo(r - o[0], i - o[1]);
				}
				supportScrollRestoration() {
					try {
						if (!this.supportsScrolling()) return !1;
						const t =
							ry(this.window.history) ||
							ry(Object.getPrototypeOf(this.window.history));
						return !(!t || (!t.writable && !t.set));
					} catch {
						return !1;
					}
				}
				supportsScrolling() {
					try {
						return (
							!!this.window &&
							!!this.window.scrollTo &&
							"pageXOffset" in this.window
						);
					} catch {
						return !1;
					}
				}
			}
			function ry(e) {
				return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
			}
			class zT extends BS {
				constructor() {
					super(...arguments), (this.supportsDOMEvents = !0);
				}
			}
			class Pc extends zT {
				static makeCurrent() {
					!(function US(e) {
						ac || (ac = e);
					})(new Pc());
				}
				onAndCancel(t, n, r) {
					return (
						t.addEventListener(n, r, !1),
						() => {
							t.removeEventListener(n, r, !1);
						}
					);
				}
				dispatchEvent(t, n) {
					t.dispatchEvent(n);
				}
				remove(t) {
					t.parentNode && t.parentNode.removeChild(t);
				}
				createElement(t, n) {
					return (n = n || this.getDefaultDocument()).createElement(t);
				}
				createHtmlDocument() {
					return document.implementation.createHTMLDocument("fakeTitle");
				}
				getDefaultDocument() {
					return document;
				}
				isElementNode(t) {
					return t.nodeType === Node.ELEMENT_NODE;
				}
				isShadowRoot(t) {
					return t instanceof DocumentFragment;
				}
				getGlobalEventTarget(t, n) {
					return "window" === n
						? window
						: "document" === n
						? t
						: "body" === n
						? t.body
						: null;
				}
				getBaseHref(t) {
					const n = (function qT() {
						return (
							(Ki = Ki || document.querySelector("base")),
							Ki ? Ki.getAttribute("href") : null
						);
					})();
					return null == n
						? null
						: (function GT(e) {
								(ia = ia || document.createElement("a")),
									ia.setAttribute("href", e);
								const t = ia.pathname;
								return "/" === t.charAt(0) ? t : `/${t}`;
						  })(n);
				}
				resetBaseElement() {
					Ki = null;
				}
				getUserAgent() {
					return window.navigator.userAgent;
				}
				getCookie(t) {
					return (function xP(e, t) {
						t = encodeURIComponent(t);
						for (const n of e.split(";")) {
							const r = n.indexOf("="),
								[i, o] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
							if (i.trim() === t) return decodeURIComponent(o);
						}
						return null;
					})(document.cookie, t);
				}
			}
			let ia,
				Ki = null;
			const ly = new F("TRANSITION_ID"),
				QT = [
					{
						provide: $s,
						useFactory: function WT(e, t, n) {
							return () => {
								n.get(Us).donePromise.then(() => {
									const r = mn(),
										i = t.querySelectorAll(`style[ng-transition="${e}"]`);
									for (let o = 0; o < i.length; o++) r.remove(i[o]);
								});
							};
						},
						deps: [ly, Ke, Nt],
						multi: !0,
					},
				];
			let KT = (() => {
				class e {
					build() {
						return new XMLHttpRequest();
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)();
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			const oa = new F("EventManagerPlugins");
			let sa = (() => {
				class e {
					constructor(n, r) {
						(this._zone = r),
							(this._eventNameToPlugin = new Map()),
							n.forEach((i) => (i.manager = this)),
							(this._plugins = n.slice().reverse());
					}
					addEventListener(n, r, i) {
						return this._findPluginFor(r).addEventListener(n, r, i);
					}
					addGlobalEventListener(n, r, i) {
						return this._findPluginFor(r).addGlobalEventListener(n, r, i);
					}
					getZone() {
						return this._zone;
					}
					_findPluginFor(n) {
						const r = this._eventNameToPlugin.get(n);
						if (r) return r;
						const i = this._plugins;
						for (let o = 0; o < i.length; o++) {
							const s = i[o];
							if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
						}
						throw new Error(`No event manager plugin found for event ${n}`);
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(S(oa), S(ve));
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			class cy {
				constructor(t) {
					this._doc = t;
				}
				addGlobalEventListener(t, n, r) {
					const i = mn().getGlobalEventTarget(this._doc, t);
					if (!i)
						throw new Error(`Unsupported event target ${i} for event ${n}`);
					return this.addEventListener(i, n, r);
				}
			}
			let dy = (() => {
					class e {
						constructor() {
							this._stylesSet = new Set();
						}
						addStyles(n) {
							const r = new Set();
							n.forEach((i) => {
								this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i));
							}),
								this.onStylesAdded(r);
						}
						onStylesAdded(n) {}
						getAllStyles() {
							return Array.from(this._stylesSet);
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)();
						}),
						(e.ɵprov = k({ token: e, factory: e.ɵfac })),
						e
					);
				})(),
				Yi = (() => {
					class e extends dy {
						constructor(n) {
							super(),
								(this._doc = n),
								(this._hostNodes = new Map()),
								this._hostNodes.set(n.head, []);
						}
						_addStylesToHost(n, r, i) {
							n.forEach((o) => {
								const s = this._doc.createElement("style");
								(s.textContent = o), i.push(r.appendChild(s));
							});
						}
						addHost(n) {
							const r = [];
							this._addStylesToHost(this._stylesSet, n, r),
								this._hostNodes.set(n, r);
						}
						removeHost(n) {
							const r = this._hostNodes.get(n);
							r && r.forEach(fy), this._hostNodes.delete(n);
						}
						onStylesAdded(n) {
							this._hostNodes.forEach((r, i) => {
								this._addStylesToHost(n, i, r);
							});
						}
						ngOnDestroy() {
							this._hostNodes.forEach((n) => n.forEach(fy));
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(S(Ke));
						}),
						(e.ɵprov = k({ token: e, factory: e.ɵfac })),
						e
					);
				})();
			function fy(e) {
				mn().remove(e);
			}
			const Tc = {
					svg: "http://www.w3.org/2000/svg",
					xhtml: "http://www.w3.org/1999/xhtml",
					xlink: "http://www.w3.org/1999/xlink",
					xml: "http://www.w3.org/XML/1998/namespace",
					xmlns: "http://www.w3.org/2000/xmlns/",
					math: "http://www.w3.org/1998/MathML/",
				},
				Oc = /%COMP%/g;
			function Ac(e, t) {
				return t.flat(100).map((n) => n.replace(Oc, e));
			}
			function gy(e) {
				return (t) => {
					if ("__ngUnwrap__" === t) return e;
					!1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
				};
			}
			let xc = (() => {
				class e {
					constructor(n, r, i) {
						(this.eventManager = n),
							(this.sharedStylesHost = r),
							(this.appId = i),
							(this.rendererByCompId = new Map()),
							(this.defaultRenderer = new Rc(n));
					}
					createRenderer(n, r) {
						if (!n || !r) return this.defaultRenderer;
						switch (r.encapsulation) {
							case Ot.Emulated: {
								let i = this.rendererByCompId.get(r.id);
								return (
									i ||
										((i = new n1(
											this.eventManager,
											this.sharedStylesHost,
											r,
											this.appId
										)),
										this.rendererByCompId.set(r.id, i)),
									i.applyToHost(n),
									i
								);
							}
							case 1:
							case Ot.ShadowDom:
								return new r1(this.eventManager, this.sharedStylesHost, n, r);
							default:
								if (!this.rendererByCompId.has(r.id)) {
									const i = Ac(r.id, r.styles);
									this.sharedStylesHost.addStyles(i),
										this.rendererByCompId.set(r.id, this.defaultRenderer);
								}
								return this.defaultRenderer;
						}
					}
					begin() {}
					end() {}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(S(sa), S(Yi), S(qi));
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			class Rc {
				constructor(t) {
					(this.eventManager = t),
						(this.data = Object.create(null)),
						(this.destroyNode = null);
				}
				destroy() {}
				createElement(t, n) {
					return n
						? document.createElementNS(Tc[n] || n, t)
						: document.createElement(t);
				}
				createComment(t) {
					return document.createComment(t);
				}
				createText(t) {
					return document.createTextNode(t);
				}
				appendChild(t, n) {
					(vy(t) ? t.content : t).appendChild(n);
				}
				insertBefore(t, n, r) {
					t && (vy(t) ? t.content : t).insertBefore(n, r);
				}
				removeChild(t, n) {
					t && t.removeChild(n);
				}
				selectRootElement(t, n) {
					let r = "string" == typeof t ? document.querySelector(t) : t;
					if (!r)
						throw new Error(`The selector "${t}" did not match any elements`);
					return n || (r.textContent = ""), r;
				}
				parentNode(t) {
					return t.parentNode;
				}
				nextSibling(t) {
					return t.nextSibling;
				}
				setAttribute(t, n, r, i) {
					if (i) {
						n = i + ":" + n;
						const o = Tc[i];
						o ? t.setAttributeNS(o, n, r) : t.setAttribute(n, r);
					} else t.setAttribute(n, r);
				}
				removeAttribute(t, n, r) {
					if (r) {
						const i = Tc[r];
						i ? t.removeAttributeNS(i, n) : t.removeAttribute(`${r}:${n}`);
					} else t.removeAttribute(n);
				}
				addClass(t, n) {
					t.classList.add(n);
				}
				removeClass(t, n) {
					t.classList.remove(n);
				}
				setStyle(t, n, r, i) {
					i & (Qe.DashCase | Qe.Important)
						? t.style.setProperty(n, r, i & Qe.Important ? "important" : "")
						: (t.style[n] = r);
				}
				removeStyle(t, n, r) {
					r & Qe.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
				}
				setProperty(t, n, r) {
					t[n] = r;
				}
				setValue(t, n) {
					t.nodeValue = n;
				}
				listen(t, n, r) {
					return "string" == typeof t
						? this.eventManager.addGlobalEventListener(t, n, gy(r))
						: this.eventManager.addEventListener(t, n, gy(r));
				}
			}
			function vy(e) {
				return "TEMPLATE" === e.tagName && void 0 !== e.content;
			}
			class n1 extends Rc {
				constructor(t, n, r, i) {
					super(t), (this.component = r);
					const o = Ac(i + "-" + r.id, r.styles);
					n.addStyles(o),
						(this.contentAttr = (function JT(e) {
							return "_ngcontent-%COMP%".replace(Oc, e);
						})(i + "-" + r.id)),
						(this.hostAttr = (function e1(e) {
							return "_nghost-%COMP%".replace(Oc, e);
						})(i + "-" + r.id));
				}
				applyToHost(t) {
					super.setAttribute(t, this.hostAttr, "");
				}
				createElement(t, n) {
					const r = super.createElement(t, n);
					return super.setAttribute(r, this.contentAttr, ""), r;
				}
			}
			class r1 extends Rc {
				constructor(t, n, r, i) {
					super(t),
						(this.sharedStylesHost = n),
						(this.hostEl = r),
						(this.shadowRoot = r.attachShadow({ mode: "open" })),
						this.sharedStylesHost.addHost(this.shadowRoot);
					const o = Ac(i.id, i.styles);
					for (let s = 0; s < o.length; s++) {
						const a = document.createElement("style");
						(a.textContent = o[s]), this.shadowRoot.appendChild(a);
					}
				}
				nodeOrShadowRoot(t) {
					return t === this.hostEl ? this.shadowRoot : t;
				}
				destroy() {
					this.sharedStylesHost.removeHost(this.shadowRoot);
				}
				appendChild(t, n) {
					return super.appendChild(this.nodeOrShadowRoot(t), n);
				}
				insertBefore(t, n, r) {
					return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
				}
				removeChild(t, n) {
					return super.removeChild(this.nodeOrShadowRoot(t), n);
				}
				parentNode(t) {
					return this.nodeOrShadowRoot(
						super.parentNode(this.nodeOrShadowRoot(t))
					);
				}
			}
			let i1 = (() => {
				class e extends cy {
					constructor(n) {
						super(n);
					}
					supports(n) {
						return !0;
					}
					addEventListener(n, r, i) {
						return (
							n.addEventListener(r, i, !1),
							() => this.removeEventListener(n, r, i)
						);
					}
					removeEventListener(n, r, i) {
						return n.removeEventListener(r, i);
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(S(Ke));
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			const yy = ["alt", "control", "meta", "shift"],
				o1 = {
					"\b": "Backspace",
					"\t": "Tab",
					"\x7f": "Delete",
					"\x1b": "Escape",
					Del: "Delete",
					Esc: "Escape",
					Left: "ArrowLeft",
					Right: "ArrowRight",
					Up: "ArrowUp",
					Down: "ArrowDown",
					Menu: "ContextMenu",
					Scroll: "ScrollLock",
					Win: "OS",
				},
				s1 = {
					alt: (e) => e.altKey,
					control: (e) => e.ctrlKey,
					meta: (e) => e.metaKey,
					shift: (e) => e.shiftKey,
				};
			let a1 = (() => {
				class e extends cy {
					constructor(n) {
						super(n);
					}
					supports(n) {
						return null != e.parseEventName(n);
					}
					addEventListener(n, r, i) {
						const o = e.parseEventName(r),
							s = e.eventCallback(o.fullKey, i, this.manager.getZone());
						return this.manager
							.getZone()
							.runOutsideAngular(() => mn().onAndCancel(n, o.domEventName, s));
					}
					static parseEventName(n) {
						const r = n.toLowerCase().split("."),
							i = r.shift();
						if (0 === r.length || ("keydown" !== i && "keyup" !== i))
							return null;
						const o = e._normalizeKey(r.pop());
						let s = "",
							a = r.indexOf("code");
						if (
							(a > -1 && (r.splice(a, 1), (s = "code.")),
							yy.forEach((l) => {
								const c = r.indexOf(l);
								c > -1 && (r.splice(c, 1), (s += l + "."));
							}),
							(s += o),
							0 != r.length || 0 === o.length)
						)
							return null;
						const u = {};
						return (u.domEventName = i), (u.fullKey = s), u;
					}
					static matchEventFullKeyCode(n, r) {
						let i = o1[n.key] || n.key,
							o = "";
						return (
							r.indexOf("code.") > -1 && ((i = n.code), (o = "code.")),
							!(null == i || !i) &&
								((i = i.toLowerCase()),
								" " === i ? (i = "space") : "." === i && (i = "dot"),
								yy.forEach((s) => {
									s !== i && (0, s1[s])(n) && (o += s + ".");
								}),
								(o += i),
								o === r)
						);
					}
					static eventCallback(n, r, i) {
						return (o) => {
							e.matchEventFullKeyCode(o, n) && i.runGuarded(() => r(o));
						};
					}
					static _normalizeKey(n) {
						return "esc" === n ? "escape" : n;
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(S(Ke));
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			const d1 = vv(jS, "browser", [
					{ provide: sv, useValue: "browser" },
					{
						provide: ov,
						useValue: function u1() {
							Pc.makeCurrent();
						},
						multi: !0,
					},
					{
						provide: Ke,
						useFactory: function c1() {
							return (
								(function kw(e) {
									ku = e;
								})(document),
								document
							);
						},
						deps: [],
					},
				]),
				Dy = new F(""),
				wy = [
					{
						provide: Bs,
						useClass: class ZT {
							addToWindow(t) {
								(oe.getAngularTestability = (r, i = !0) => {
									const o = t.findTestabilityInTree(r, i);
									if (null == o)
										throw new Error("Could not find testability for element.");
									return o;
								}),
									(oe.getAllAngularTestabilities = () =>
										t.getAllTestabilities()),
									(oe.getAllAngularRootElements = () => t.getAllRootElements()),
									oe.frameworkStabilizers || (oe.frameworkStabilizers = []),
									oe.frameworkStabilizers.push((r) => {
										const i = oe.getAllAngularTestabilities();
										let o = i.length,
											s = !1;
										const a = function (u) {
											(s = s || u), o--, 0 == o && r(s);
										};
										i.forEach(function (u) {
											u.whenStable(a);
										});
									});
							}
							findTestabilityInTree(t, n, r) {
								return null == n
									? null
									: t.getTestability(n) ??
											(r
												? mn().isShadowRoot(n)
													? this.findTestabilityInTree(t, n.host, !0)
													: this.findTestabilityInTree(t, n.parentElement, !0)
												: null);
							}
						},
						deps: [],
					},
					{ provide: hv, useClass: Kl, deps: [ve, Yl, Bs] },
					{ provide: Kl, useClass: Kl, deps: [ve, Yl, Bs] },
				],
				by = [
					{ provide: qu, useValue: "root" },
					{
						provide: vr,
						useFactory: function l1() {
							return new vr();
						},
						deps: [],
					},
					{ provide: oa, useClass: i1, multi: !0, deps: [Ke, ve, sv] },
					{ provide: oa, useClass: a1, multi: !0, deps: [Ke] },
					{ provide: xc, useClass: xc, deps: [sa, Yi, qi] },
					{ provide: Wh, useExisting: xc },
					{ provide: dy, useExisting: Yi },
					{ provide: Yi, useClass: Yi, deps: [Ke] },
					{ provide: sa, useClass: sa, deps: [oa, ve] },
					{ provide: class vT {}, useClass: KT, deps: [] },
					[],
				];
			let f1 = (() => {
					class e {
						constructor(n) {}
						static withServerTransition(n) {
							return {
								ngModule: e,
								providers: [
									{ provide: qi, useValue: n.appId },
									{ provide: ly, useExisting: qi },
									QT,
								],
							};
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(S(Dy, 12));
						}),
						(e.ɵmod = Gt({ type: e })),
						(e.ɵinj = Tt({ providers: [...by, ...wy], imports: [Ec, VS] })),
						e
					);
				})(),
				My = (() => {
					class e {
						constructor(n) {
							this._doc = n;
						}
						getTitle() {
							return this._doc.title;
						}
						setTitle(n) {
							this._doc.title = n || "";
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(S(Ke));
						}),
						(e.ɵprov = k({
							token: e,
							factory: function (n) {
								let r = null;
								return (
									(r = n
										? new n()
										: (function p1() {
												return new My(S(Ke));
										  })()),
									r
								);
							},
							providedIn: "root",
						})),
						e
					);
				})();
			function O(...e) {
				return De(e, ri(e));
			}
			typeof window < "u" && window;
			class St extends Ut {
				constructor(t) {
					super(), (this._value = t);
				}
				get value() {
					return this.getValue();
				}
				_subscribe(t) {
					const n = super._subscribe(t);
					return !n.closed && t.next(this._value), n;
				}
				getValue() {
					const { hasError: t, thrownError: n, _value: r } = this;
					if (t) throw n;
					return this._throwIfClosed(), r;
				}
				next(t) {
					super.next((this._value = t));
				}
			}
			const aa = ei(
					(e) =>
						function () {
							e(this),
								(this.name = "EmptyError"),
								(this.message = "no elements in sequence");
						}
				),
				{ isArray: w1 } = Array,
				{ getPrototypeOf: b1, prototype: M1, keys: E1 } = Object;
			const { isArray: P1 } = Array;
			function Sy(...e) {
				const t = ri(e),
					n = (function gC(e) {
						return ie(Ra(e)) ? e.pop() : void 0;
					})(e),
					{ args: r, keys: i } = (function I1(e) {
						if (1 === e.length) {
							const t = e[0];
							if (w1(t)) return { args: t, keys: null };
							if (
								(function S1(e) {
									return e && "object" == typeof e && b1(e) === M1;
								})(t)
							) {
								const n = E1(t);
								return { args: n.map((r) => t[r]), keys: n };
							}
						}
						return { args: e, keys: null };
					})(e);
				if (0 === r.length) return De([], t);
				const o = new Ce(
					(function x1(e, t, n = Mn) {
						return (r) => {
							Py(
								t,
								() => {
									const { length: i } = e,
										o = new Array(i);
									let s = i,
										a = i;
									for (let u = 0; u < i; u++)
										Py(
											t,
											() => {
												const l = De(e[u], t);
												let c = !1;
												l.subscribe(
													Se(
														r,
														(d) => {
															(o[u] = d),
																c || ((c = !0), a--),
																a || r.next(n(o.slice()));
														},
														() => {
															--s || r.complete();
														}
													)
												);
											},
											r
										);
								},
								r
							);
						};
					})(
						r,
						t,
						i
							? (s) =>
									(function A1(e, t) {
										return e.reduce((n, r, i) => ((n[r] = t[i]), n), {});
									})(i, s)
							: Mn
					)
				);
				return n
					? o.pipe(
							(function O1(e) {
								return W((t) =>
									(function T1(e, t) {
										return P1(t) ? e(...t) : e(t);
									})(e, t)
								);
							})(n)
					  )
					: o;
			}
			function Py(e, t, n) {
				e ? Bt(n, e, t) : t();
			}
			function kc(...e) {
				return (function R1() {
					return Kn(1);
				})()(De(e, ri(e)));
			}
			function Ty(e) {
				return new Ce((t) => {
					Pt(e()).subscribe(t);
				});
			}
			function Xi(e, t) {
				const n = ie(e) ? e : () => e,
					r = (i) => i.error(n());
				return new Ce(t ? (i) => t.schedule(r, 0, i) : r);
			}
			function Lc() {
				return Ie((e, t) => {
					let n = null;
					e._refCount++;
					const r = Se(t, void 0, void 0, void 0, () => {
						if (!e || e._refCount <= 0 || 0 < --e._refCount)
							return void (n = null);
						const i = e._connection,
							o = n;
						(n = null),
							i && (!o || i === o) && i.unsubscribe(),
							t.unsubscribe();
					});
					e.subscribe(r), r.closed || (n = e.connect());
				});
			}
			class Oy extends Ce {
				constructor(t, n) {
					super(),
						(this.source = t),
						(this.subjectFactory = n),
						(this._subject = null),
						(this._refCount = 0),
						(this._connection = null),
						Dd(t) && (this.lift = t.lift);
				}
				_subscribe(t) {
					return this.getSubject().subscribe(t);
				}
				getSubject() {
					const t = this._subject;
					return (
						(!t || t.isStopped) && (this._subject = this.subjectFactory()),
						this._subject
					);
				}
				_teardown() {
					this._refCount = 0;
					const { _connection: t } = this;
					(this._subject = this._connection = null), t?.unsubscribe();
				}
				connect() {
					let t = this._connection;
					if (!t) {
						t = this._connection = new st();
						const n = this.getSubject();
						t.add(
							this.source.subscribe(
								Se(
									n,
									void 0,
									() => {
										this._teardown(), n.complete();
									},
									(r) => {
										this._teardown(), n.error(r);
									},
									() => this._teardown()
								)
							)
						),
							t.closed && ((this._connection = null), (t = st.EMPTY));
					}
					return t;
				}
				refCount() {
					return Lc()(this);
				}
			}
			function Vt(e, t) {
				return Ie((n, r) => {
					let i = null,
						o = 0,
						s = !1;
					const a = () => s && !i && r.complete();
					n.subscribe(
						Se(
							r,
							(u) => {
								i?.unsubscribe();
								let l = 0;
								const c = o++;
								Pt(e(u, c)).subscribe(
									(i = Se(
										r,
										(d) => r.next(t ? t(u, d, c, l++) : d),
										() => {
											(i = null), a();
										}
									))
								);
							},
							() => {
								(s = !0), a();
							}
						)
					);
				});
			}
			function Ji(e) {
				return e <= 0
					? () => Ht
					: Ie((t, n) => {
							let r = 0;
							t.subscribe(
								Se(n, (i) => {
									++r <= e && (n.next(i), e <= r && n.complete());
								})
							);
					  });
			}
			function yn(e, t) {
				return Ie((n, r) => {
					let i = 0;
					n.subscribe(Se(r, (o) => e.call(t, o, i++) && r.next(o)));
				});
			}
			function ua(e) {
				return Ie((t, n) => {
					let r = !1;
					t.subscribe(
						Se(
							n,
							(i) => {
								(r = !0), n.next(i);
							},
							() => {
								r || n.next(e), n.complete();
							}
						)
					);
				});
			}
			function Ay(e = F1) {
				return Ie((t, n) => {
					let r = !1;
					t.subscribe(
						Se(
							n,
							(i) => {
								(r = !0), n.next(i);
							},
							() => (r ? n.complete() : n.error(e()))
						)
					);
				});
			}
			function F1() {
				return new aa();
			}
			function _n(e, t) {
				const n = arguments.length >= 2;
				return (r) =>
					r.pipe(
						e ? yn((i, o) => e(i, o, r)) : Mn,
						Ji(1),
						n ? ua(t) : Ay(() => new aa())
					);
			}
			function Un(e, t) {
				return ie(t) ? Pe(e, t, 1) : Pe(e, 1);
			}
			function je(e, t, n) {
				const r = ie(e) || t || n ? { next: e, error: t, complete: n } : e;
				return r
					? Ie((i, o) => {
							var s;
							null === (s = r.subscribe) || void 0 === s || s.call(r);
							let a = !0;
							i.subscribe(
								Se(
									o,
									(u) => {
										var l;
										null === (l = r.next) || void 0 === l || l.call(r, u),
											o.next(u);
									},
									() => {
										var u;
										(a = !1),
											null === (u = r.complete) || void 0 === u || u.call(r),
											o.complete();
									},
									(u) => {
										var l;
										(a = !1),
											null === (l = r.error) || void 0 === l || l.call(r, u),
											o.error(u);
									},
									() => {
										var u, l;
										a &&
											(null === (u = r.unsubscribe) ||
												void 0 === u ||
												u.call(r)),
											null === (l = r.finalize) || void 0 === l || l.call(r);
									}
								)
							);
					  })
					: Mn;
			}
			function Cn(e) {
				return Ie((t, n) => {
					let o,
						r = null,
						i = !1;
					(r = t.subscribe(
						Se(n, void 0, void 0, (s) => {
							(o = Pt(e(s, Cn(e)(t)))),
								r ? (r.unsubscribe(), (r = null), o.subscribe(n)) : (i = !0);
						})
					)),
						i && (r.unsubscribe(), (r = null), o.subscribe(n));
				});
			}
			function k1(e, t, n, r, i) {
				return (o, s) => {
					let a = n,
						u = t,
						l = 0;
					o.subscribe(
						Se(
							s,
							(c) => {
								const d = l++;
								(u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u);
							},
							i &&
								(() => {
									a && s.next(u), s.complete();
								})
						)
					);
				};
			}
			function xy(e, t) {
				return Ie(k1(e, t, arguments.length >= 2, !0));
			}
			function jc(e) {
				return e <= 0
					? () => Ht
					: Ie((t, n) => {
							let r = [];
							t.subscribe(
								Se(
									n,
									(i) => {
										r.push(i), e < r.length && r.shift();
									},
									() => {
										for (const i of r) n.next(i);
										n.complete();
									},
									void 0,
									() => {
										r = null;
									}
								)
							);
					  });
			}
			function Ry(e, t) {
				const n = arguments.length >= 2;
				return (r) =>
					r.pipe(
						e ? yn((i, o) => e(i, o, r)) : Mn,
						jc(1),
						n ? ua(t) : Ay(() => new aa())
					);
			}
			function Vc(e) {
				return Ie((t, n) => {
					try {
						t.subscribe(n);
					} finally {
						n.add(e);
					}
				});
			}
			const z = "primary",
				eo = Symbol("RouteTitle");
			class V1 {
				constructor(t) {
					this.params = t || {};
				}
				has(t) {
					return Object.prototype.hasOwnProperty.call(this.params, t);
				}
				get(t) {
					if (this.has(t)) {
						const n = this.params[t];
						return Array.isArray(n) ? n[0] : n;
					}
					return null;
				}
				getAll(t) {
					if (this.has(t)) {
						const n = this.params[t];
						return Array.isArray(n) ? n : [n];
					}
					return [];
				}
				get keys() {
					return Object.keys(this.params);
				}
			}
			function Lr(e) {
				return new V1(e);
			}
			function $1(e, t, n) {
				const r = n.path.split("/");
				if (
					r.length > e.length ||
					("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
				)
					return null;
				const i = {};
				for (let o = 0; o < r.length; o++) {
					const s = r[o],
						a = e[o];
					if (s.startsWith(":")) i[s.substring(1)] = a;
					else if (s !== a.path) return null;
				}
				return { consumed: e.slice(0, r.length), posParams: i };
			}
			function $t(e, t) {
				const n = e ? Object.keys(e) : void 0,
					r = t ? Object.keys(t) : void 0;
				if (!n || !r || n.length != r.length) return !1;
				let i;
				for (let o = 0; o < n.length; o++)
					if (((i = n[o]), !Ny(e[i], t[i]))) return !1;
				return !0;
			}
			function Ny(e, t) {
				if (Array.isArray(e) && Array.isArray(t)) {
					if (e.length !== t.length) return !1;
					const n = [...e].sort(),
						r = [...t].sort();
					return n.every((i, o) => r[o] === i);
				}
				return e === t;
			}
			function Fy(e) {
				return Array.prototype.concat.apply([], e);
			}
			function ky(e) {
				return e.length > 0 ? e[e.length - 1] : null;
			}
			function xe(e, t) {
				for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
			}
			function Dn(e) {
				return Gp(e) ? e : Ps(e) ? De(Promise.resolve(e)) : O(e);
			}
			const la = !1,
				B1 = {
					exact: function Vy(e, t, n) {
						if (
							!Hn(e.segments, t.segments) ||
							!ca(e.segments, t.segments, n) ||
							e.numberOfChildren !== t.numberOfChildren
						)
							return !1;
						for (const r in t.children)
							if (!e.children[r] || !Vy(e.children[r], t.children[r], n))
								return !1;
						return !0;
					},
					subset: $y,
				},
				Ly = {
					exact: function H1(e, t) {
						return $t(e, t);
					},
					subset: function z1(e, t) {
						return (
							Object.keys(t).length <= Object.keys(e).length &&
							Object.keys(t).every((n) => Ny(e[n], t[n]))
						);
					},
					ignored: () => !0,
				};
			function jy(e, t, n) {
				return (
					B1[n.paths](e.root, t.root, n.matrixParams) &&
					Ly[n.queryParams](e.queryParams, t.queryParams) &&
					!("exact" === n.fragment && e.fragment !== t.fragment)
				);
			}
			function $y(e, t, n) {
				return Uy(e, t, t.segments, n);
			}
			function Uy(e, t, n, r) {
				if (e.segments.length > n.length) {
					const i = e.segments.slice(0, n.length);
					return !(!Hn(i, n) || t.hasChildren() || !ca(i, n, r));
				}
				if (e.segments.length === n.length) {
					if (!Hn(e.segments, n) || !ca(e.segments, n, r)) return !1;
					for (const i in t.children)
						if (!e.children[i] || !$y(e.children[i], t.children[i], r))
							return !1;
					return !0;
				}
				{
					const i = n.slice(0, e.segments.length),
						o = n.slice(e.segments.length);
					return (
						!!(Hn(e.segments, i) && ca(e.segments, i, r) && e.children[z]) &&
						Uy(e.children[z], t, o, r)
					);
				}
			}
			function ca(e, t, n) {
				return t.every((r, i) => Ly[n](e[i].parameters, r.parameters));
			}
			class Bn {
				constructor(t = new q([], {}), n = {}, r = null) {
					(this.root = t), (this.queryParams = n), (this.fragment = r);
				}
				get queryParamMap() {
					return (
						this._queryParamMap || (this._queryParamMap = Lr(this.queryParams)),
						this._queryParamMap
					);
				}
				toString() {
					return W1.serialize(this);
				}
			}
			class q {
				constructor(t, n) {
					(this.segments = t),
						(this.children = n),
						(this.parent = null),
						xe(n, (r, i) => (r.parent = this));
				}
				hasChildren() {
					return this.numberOfChildren > 0;
				}
				get numberOfChildren() {
					return Object.keys(this.children).length;
				}
				toString() {
					return da(this);
				}
			}
			class to {
				constructor(t, n) {
					(this.path = t), (this.parameters = n);
				}
				get parameterMap() {
					return (
						this._parameterMap || (this._parameterMap = Lr(this.parameters)),
						this._parameterMap
					);
				}
				toString() {
					return zy(this);
				}
			}
			function Hn(e, t) {
				return e.length === t.length && e.every((n, r) => n.path === t[r].path);
			}
			let no = (() => {
				class e {}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)();
					}),
					(e.ɵprov = k({
						token: e,
						factory: function () {
							return new $c();
						},
						providedIn: "root",
					})),
					e
				);
			})();
			class $c {
				parse(t) {
					const n = new nO(t);
					return new Bn(
						n.parseRootSegment(),
						n.parseQueryParams(),
						n.parseFragment()
					);
				}
				serialize(t) {
					const n = `/${ro(t.root, !0)}`,
						r = (function K1(e) {
							const t = Object.keys(e)
								.map((n) => {
									const r = e[n];
									return Array.isArray(r)
										? r.map((i) => `${fa(n)}=${fa(i)}`).join("&")
										: `${fa(n)}=${fa(r)}`;
								})
								.filter((n) => !!n);
							return t.length ? `?${t.join("&")}` : "";
						})(t.queryParams);
					return `${n}${r}${
						"string" == typeof t.fragment
							? `#${(function Q1(e) {
									return encodeURI(e);
							  })(t.fragment)}`
							: ""
					}`;
				}
			}
			const W1 = new $c();
			function da(e) {
				return e.segments.map((t) => zy(t)).join("/");
			}
			function ro(e, t) {
				if (!e.hasChildren()) return da(e);
				if (t) {
					const n = e.children[z] ? ro(e.children[z], !1) : "",
						r = [];
					return (
						xe(e.children, (i, o) => {
							o !== z && r.push(`${o}:${ro(i, !1)}`);
						}),
						r.length > 0 ? `${n}(${r.join("//")})` : n
					);
				}
				{
					const n = (function G1(e, t) {
						let n = [];
						return (
							xe(e.children, (r, i) => {
								i === z && (n = n.concat(t(r, i)));
							}),
							xe(e.children, (r, i) => {
								i !== z && (n = n.concat(t(r, i)));
							}),
							n
						);
					})(e, (r, i) =>
						i === z ? [ro(e.children[z], !1)] : [`${i}:${ro(r, !1)}`]
					);
					return 1 === Object.keys(e.children).length && null != e.children[z]
						? `${da(e)}/${n[0]}`
						: `${da(e)}/(${n.join("//")})`;
				}
			}
			function By(e) {
				return encodeURIComponent(e)
					.replace(/%40/g, "@")
					.replace(/%3A/gi, ":")
					.replace(/%24/g, "$")
					.replace(/%2C/gi, ",");
			}
			function fa(e) {
				return By(e).replace(/%3B/gi, ";");
			}
			function Uc(e) {
				return By(e)
					.replace(/\(/g, "%28")
					.replace(/\)/g, "%29")
					.replace(/%26/gi, "&");
			}
			function ha(e) {
				return decodeURIComponent(e);
			}
			function Hy(e) {
				return ha(e.replace(/\+/g, "%20"));
			}
			function zy(e) {
				return `${Uc(e.path)}${(function Z1(e) {
					return Object.keys(e)
						.map((t) => `;${Uc(t)}=${Uc(e[t])}`)
						.join("");
				})(e.parameters)}`;
			}
			const Y1 = /^[^\/()?;=#]+/;
			function pa(e) {
				const t = e.match(Y1);
				return t ? t[0] : "";
			}
			const X1 = /^[^=?&#]+/,
				eO = /^[^&#]+/;
			class nO {
				constructor(t) {
					(this.url = t), (this.remaining = t);
				}
				parseRootSegment() {
					return (
						this.consumeOptional("/"),
						"" === this.remaining ||
						this.peekStartsWith("?") ||
						this.peekStartsWith("#")
							? new q([], {})
							: new q([], this.parseChildren())
					);
				}
				parseQueryParams() {
					const t = {};
					if (this.consumeOptional("?"))
						do {
							this.parseQueryParam(t);
						} while (this.consumeOptional("&"));
					return t;
				}
				parseFragment() {
					return this.consumeOptional("#")
						? decodeURIComponent(this.remaining)
						: null;
				}
				parseChildren() {
					if ("" === this.remaining) return {};
					this.consumeOptional("/");
					const t = [];
					for (
						this.peekStartsWith("(") || t.push(this.parseSegment());
						this.peekStartsWith("/") &&
						!this.peekStartsWith("//") &&
						!this.peekStartsWith("/(");

					)
						this.capture("/"), t.push(this.parseSegment());
					let n = {};
					this.peekStartsWith("/(") &&
						(this.capture("/"), (n = this.parseParens(!0)));
					let r = {};
					return (
						this.peekStartsWith("(") && (r = this.parseParens(!1)),
						(t.length > 0 || Object.keys(n).length > 0) && (r[z] = new q(t, n)),
						r
					);
				}
				parseSegment() {
					const t = pa(this.remaining);
					if ("" === t && this.peekStartsWith(";")) throw new w(4009, la);
					return this.capture(t), new to(ha(t), this.parseMatrixParams());
				}
				parseMatrixParams() {
					const t = {};
					for (; this.consumeOptional(";"); ) this.parseParam(t);
					return t;
				}
				parseParam(t) {
					const n = pa(this.remaining);
					if (!n) return;
					this.capture(n);
					let r = "";
					if (this.consumeOptional("=")) {
						const i = pa(this.remaining);
						i && ((r = i), this.capture(r));
					}
					t[ha(n)] = ha(r);
				}
				parseQueryParam(t) {
					const n = (function J1(e) {
						const t = e.match(X1);
						return t ? t[0] : "";
					})(this.remaining);
					if (!n) return;
					this.capture(n);
					let r = "";
					if (this.consumeOptional("=")) {
						const s = (function tO(e) {
							const t = e.match(eO);
							return t ? t[0] : "";
						})(this.remaining);
						s && ((r = s), this.capture(r));
					}
					const i = Hy(n),
						o = Hy(r);
					if (t.hasOwnProperty(i)) {
						let s = t[i];
						Array.isArray(s) || ((s = [s]), (t[i] = s)), s.push(o);
					} else t[i] = o;
				}
				parseParens(t) {
					const n = {};
					for (
						this.capture("(");
						!this.consumeOptional(")") && this.remaining.length > 0;

					) {
						const r = pa(this.remaining),
							i = this.remaining[r.length];
						if ("/" !== i && ")" !== i && ";" !== i) throw new w(4010, la);
						let o;
						r.indexOf(":") > -1
							? ((o = r.slice(0, r.indexOf(":"))),
							  this.capture(o),
							  this.capture(":"))
							: t && (o = z);
						const s = this.parseChildren();
						(n[o] = 1 === Object.keys(s).length ? s[z] : new q([], s)),
							this.consumeOptional("//");
					}
					return n;
				}
				peekStartsWith(t) {
					return this.remaining.startsWith(t);
				}
				consumeOptional(t) {
					return (
						!!this.peekStartsWith(t) &&
						((this.remaining = this.remaining.substring(t.length)), !0)
					);
				}
				capture(t) {
					if (!this.consumeOptional(t)) throw new w(4011, la);
				}
			}
			function Bc(e) {
				return e.segments.length > 0 ? new q([], { [z]: e }) : e;
			}
			function ga(e) {
				const t = {};
				for (const r of Object.keys(e.children)) {
					const o = ga(e.children[r]);
					(o.segments.length > 0 || o.hasChildren()) && (t[r] = o);
				}
				return (function rO(e) {
					if (1 === e.numberOfChildren && e.children[z]) {
						const t = e.children[z];
						return new q(e.segments.concat(t.segments), t.children);
					}
					return e;
				})(new q(e.segments, t));
			}
			function zn(e) {
				return e instanceof Bn;
			}
			function sO(e, t, n, r, i) {
				if (0 === n.length) return jr(t.root, t.root, t.root, r, i);
				const o = (function Wy(e) {
					if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
						return new Gy(!0, 0, e);
					let t = 0,
						n = !1;
					const r = e.reduce((i, o, s) => {
						if ("object" == typeof o && null != o) {
							if (o.outlets) {
								const a = {};
								return (
									xe(o.outlets, (u, l) => {
										a[l] = "string" == typeof u ? u.split("/") : u;
									}),
									[...i, { outlets: a }]
								);
							}
							if (o.segmentPath) return [...i, o.segmentPath];
						}
						return "string" != typeof o
							? [...i, o]
							: 0 === s
							? (o.split("/").forEach((a, u) => {
									(0 == u && "." === a) ||
										(0 == u && "" === a
											? (n = !0)
											: ".." === a
											? t++
											: "" != a && i.push(a));
							  }),
							  i)
							: [...i, o];
					}, []);
					return new Gy(n, t, r);
				})(n);
				return o.toRoot()
					? jr(t.root, t.root, new q([], {}), r, i)
					: (function s(u) {
							const l = (function uO(e, t, n, r) {
									if (e.isAbsolute) return new Vr(t.root, !0, 0);
									if (-1 === r) return new Vr(n, n === t.root, 0);
									return (function Qy(e, t, n) {
										let r = e,
											i = t,
											o = n;
										for (; o > i; ) {
											if (((o -= i), (r = r.parent), !r)) throw new w(4005, !1);
											i = r.segments.length;
										}
										return new Vr(r, !1, i - o);
									})(n, r + (io(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
								})(o, t, e.snapshot?._urlSegment, u),
								c = l.processChildren
									? so(l.segmentGroup, l.index, o.commands)
									: zc(l.segmentGroup, l.index, o.commands);
							return jr(t.root, l.segmentGroup, c, r, i);
					  })(e.snapshot?._lastPathIndex);
			}
			function io(e) {
				return (
					"object" == typeof e && null != e && !e.outlets && !e.segmentPath
				);
			}
			function oo(e) {
				return "object" == typeof e && null != e && e.outlets;
			}
			function jr(e, t, n, r, i) {
				let s,
					o = {};
				r &&
					xe(r, (u, l) => {
						o[l] = Array.isArray(u) ? u.map((c) => `${c}`) : `${u}`;
					}),
					(s = e === t ? n : qy(e, t, n));
				const a = Bc(ga(s));
				return new Bn(a, o, i);
			}
			function qy(e, t, n) {
				const r = {};
				return (
					xe(e.children, (i, o) => {
						r[o] = i === t ? n : qy(i, t, n);
					}),
					new q(e.segments, r)
				);
			}
			class Gy {
				constructor(t, n, r) {
					if (
						((this.isAbsolute = t),
						(this.numberOfDoubleDots = n),
						(this.commands = r),
						t && r.length > 0 && io(r[0]))
					)
						throw new w(4003, !1);
					const i = r.find(oo);
					if (i && i !== ky(r)) throw new w(4004, !1);
				}
				toRoot() {
					return (
						this.isAbsolute &&
						1 === this.commands.length &&
						"/" == this.commands[0]
					);
				}
			}
			class Vr {
				constructor(t, n, r) {
					(this.segmentGroup = t), (this.processChildren = n), (this.index = r);
				}
			}
			function zc(e, t, n) {
				if (
					(e || (e = new q([], {})), 0 === e.segments.length && e.hasChildren())
				)
					return so(e, t, n);
				const r = (function cO(e, t, n) {
						let r = 0,
							i = t;
						const o = { match: !1, pathIndex: 0, commandIndex: 0 };
						for (; i < e.segments.length; ) {
							if (r >= n.length) return o;
							const s = e.segments[i],
								a = n[r];
							if (oo(a)) break;
							const u = `${a}`,
								l = r < n.length - 1 ? n[r + 1] : null;
							if (i > 0 && void 0 === u) break;
							if (u && l && "object" == typeof l && void 0 === l.outlets) {
								if (!Ky(u, l, s)) return o;
								r += 2;
							} else {
								if (!Ky(u, {}, s)) return o;
								r++;
							}
							i++;
						}
						return { match: !0, pathIndex: i, commandIndex: r };
					})(e, t, n),
					i = n.slice(r.commandIndex);
				if (r.match && r.pathIndex < e.segments.length) {
					const o = new q(e.segments.slice(0, r.pathIndex), {});
					return (
						(o.children[z] = new q(e.segments.slice(r.pathIndex), e.children)),
						so(o, 0, i)
					);
				}
				return r.match && 0 === i.length
					? new q(e.segments, {})
					: r.match && !e.hasChildren()
					? qc(e, t, n)
					: r.match
					? so(e, 0, i)
					: qc(e, t, n);
			}
			function so(e, t, n) {
				if (0 === n.length) return new q(e.segments, {});
				{
					const r = (function lO(e) {
							return oo(e[0]) ? e[0].outlets : { [z]: e };
						})(n),
						i = {};
					return (
						xe(r, (o, s) => {
							"string" == typeof o && (o = [o]),
								null !== o && (i[s] = zc(e.children[s], t, o));
						}),
						xe(e.children, (o, s) => {
							void 0 === r[s] && (i[s] = o);
						}),
						new q(e.segments, i)
					);
				}
			}
			function qc(e, t, n) {
				const r = e.segments.slice(0, t);
				let i = 0;
				for (; i < n.length; ) {
					const o = n[i];
					if (oo(o)) {
						const u = dO(o.outlets);
						return new q(r, u);
					}
					if (0 === i && io(n[0])) {
						r.push(new to(e.segments[t].path, Zy(n[0]))), i++;
						continue;
					}
					const s = oo(o) ? o.outlets[z] : `${o}`,
						a = i < n.length - 1 ? n[i + 1] : null;
					s && a && io(a)
						? (r.push(new to(s, Zy(a))), (i += 2))
						: (r.push(new to(s, {})), i++);
				}
				return new q(r, {});
			}
			function dO(e) {
				const t = {};
				return (
					xe(e, (n, r) => {
						"string" == typeof n && (n = [n]),
							null !== n && (t[r] = qc(new q([], {}), 0, n));
					}),
					t
				);
			}
			function Zy(e) {
				const t = {};
				return xe(e, (n, r) => (t[r] = `${n}`)), t;
			}
			function Ky(e, t, n) {
				return e == n.path && $t(t, n.parameters);
			}
			class an {
				constructor(t, n) {
					(this.id = t), (this.url = n);
				}
			}
			class Gc extends an {
				constructor(t, n, r = "imperative", i = null) {
					super(t, n),
						(this.type = 0),
						(this.navigationTrigger = r),
						(this.restoredState = i);
				}
				toString() {
					return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
				}
			}
			class qn extends an {
				constructor(t, n, r) {
					super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
				}
				toString() {
					return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
				}
			}
			class ma extends an {
				constructor(t, n, r, i) {
					super(t, n), (this.reason = r), (this.code = i), (this.type = 2);
				}
				toString() {
					return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
				}
			}
			class Yy extends an {
				constructor(t, n, r, i) {
					super(t, n), (this.error = r), (this.target = i), (this.type = 3);
				}
				toString() {
					return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
				}
			}
			class fO extends an {
				constructor(t, n, r, i) {
					super(t, n),
						(this.urlAfterRedirects = r),
						(this.state = i),
						(this.type = 4);
				}
				toString() {
					return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class hO extends an {
				constructor(t, n, r, i) {
					super(t, n),
						(this.urlAfterRedirects = r),
						(this.state = i),
						(this.type = 7);
				}
				toString() {
					return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class pO extends an {
				constructor(t, n, r, i, o) {
					super(t, n),
						(this.urlAfterRedirects = r),
						(this.state = i),
						(this.shouldActivate = o),
						(this.type = 8);
				}
				toString() {
					return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
				}
			}
			class gO extends an {
				constructor(t, n, r, i) {
					super(t, n),
						(this.urlAfterRedirects = r),
						(this.state = i),
						(this.type = 5);
				}
				toString() {
					return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class mO extends an {
				constructor(t, n, r, i) {
					super(t, n),
						(this.urlAfterRedirects = r),
						(this.state = i),
						(this.type = 6);
				}
				toString() {
					return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class vO {
				constructor(t) {
					(this.route = t), (this.type = 9);
				}
				toString() {
					return `RouteConfigLoadStart(path: ${this.route.path})`;
				}
			}
			class yO {
				constructor(t) {
					(this.route = t), (this.type = 10);
				}
				toString() {
					return `RouteConfigLoadEnd(path: ${this.route.path})`;
				}
			}
			class _O {
				constructor(t) {
					(this.snapshot = t), (this.type = 11);
				}
				toString() {
					return `ChildActivationStart(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
					}')`;
				}
			}
			class CO {
				constructor(t) {
					(this.snapshot = t), (this.type = 12);
				}
				toString() {
					return `ChildActivationEnd(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
					}')`;
				}
			}
			class DO {
				constructor(t) {
					(this.snapshot = t), (this.type = 13);
				}
				toString() {
					return `ActivationStart(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
					}')`;
				}
			}
			class wO {
				constructor(t) {
					(this.snapshot = t), (this.type = 14);
				}
				toString() {
					return `ActivationEnd(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
					}')`;
				}
			}
			class Xy {
				constructor(t, n, r) {
					(this.routerEvent = t),
						(this.position = n),
						(this.anchor = r),
						(this.type = 15);
				}
				toString() {
					return `Scroll(anchor: '${this.anchor}', position: '${
						this.position ? `${this.position[0]}, ${this.position[1]}` : null
					}')`;
				}
			}
			let MO = (() => {
					class e {
						createUrlTree(n, r, i, o, s, a) {
							return sO(n || r.root, i, o, s, a);
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)();
						}),
						(e.ɵprov = k({ token: e, factory: e.ɵfac })),
						e
					);
				})(),
				EO = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)();
						}),
						(e.ɵprov = k({
							token: e,
							factory: function (t) {
								return MO.ɵfac(t);
							},
							providedIn: "root",
						})),
						e
					);
				})();
			class Jy {
				constructor(t) {
					this._root = t;
				}
				get root() {
					return this._root.value;
				}
				parent(t) {
					const n = this.pathFromRoot(t);
					return n.length > 1 ? n[n.length - 2] : null;
				}
				children(t) {
					const n = Wc(t, this._root);
					return n ? n.children.map((r) => r.value) : [];
				}
				firstChild(t) {
					const n = Wc(t, this._root);
					return n && n.children.length > 0 ? n.children[0].value : null;
				}
				siblings(t) {
					const n = Qc(t, this._root);
					return n.length < 2
						? []
						: n[n.length - 2].children
								.map((i) => i.value)
								.filter((i) => i !== t);
				}
				pathFromRoot(t) {
					return Qc(t, this._root).map((n) => n.value);
				}
			}
			function Wc(e, t) {
				if (e === t.value) return t;
				for (const n of t.children) {
					const r = Wc(e, n);
					if (r) return r;
				}
				return null;
			}
			function Qc(e, t) {
				if (e === t.value) return [t];
				for (const n of t.children) {
					const r = Qc(e, n);
					if (r.length) return r.unshift(t), r;
				}
				return [];
			}
			class un {
				constructor(t, n) {
					(this.value = t), (this.children = n);
				}
				toString() {
					return `TreeNode(${this.value})`;
				}
			}
			function $r(e) {
				const t = {};
				return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
			}
			class e_ extends Jy {
				constructor(t, n) {
					super(t), (this.snapshot = n), Zc(this, t);
				}
				toString() {
					return this.snapshot.toString();
				}
			}
			function t_(e, t) {
				const n = (function IO(e, t) {
						const s = new va([], {}, {}, "", {}, z, t, null, e.root, -1, {});
						return new r_("", new un(s, []));
					})(e, t),
					r = new St([new to("", {})]),
					i = new St({}),
					o = new St({}),
					s = new St({}),
					a = new St(""),
					u = new Gn(r, i, s, a, o, z, t, n.root);
				return (u.snapshot = n.root), new e_(new un(u, []), n);
			}
			class Gn {
				constructor(t, n, r, i, o, s, a, u) {
					(this.url = t),
						(this.params = n),
						(this.queryParams = r),
						(this.fragment = i),
						(this.data = o),
						(this.outlet = s),
						(this.component = a),
						(this.title = this.data?.pipe(W((l) => l[eo])) ?? O(void 0)),
						(this._futureSnapshot = u);
				}
				get routeConfig() {
					return this._futureSnapshot.routeConfig;
				}
				get root() {
					return this._routerState.root;
				}
				get parent() {
					return this._routerState.parent(this);
				}
				get firstChild() {
					return this._routerState.firstChild(this);
				}
				get children() {
					return this._routerState.children(this);
				}
				get pathFromRoot() {
					return this._routerState.pathFromRoot(this);
				}
				get paramMap() {
					return (
						this._paramMap ||
							(this._paramMap = this.params.pipe(W((t) => Lr(t)))),
						this._paramMap
					);
				}
				get queryParamMap() {
					return (
						this._queryParamMap ||
							(this._queryParamMap = this.queryParams.pipe(W((t) => Lr(t)))),
						this._queryParamMap
					);
				}
				toString() {
					return this.snapshot
						? this.snapshot.toString()
						: `Future(${this._futureSnapshot})`;
				}
			}
			function n_(e, t = "emptyOnly") {
				const n = e.pathFromRoot;
				let r = 0;
				if ("always" !== t)
					for (r = n.length - 1; r >= 1; ) {
						const i = n[r],
							o = n[r - 1];
						if (i.routeConfig && "" === i.routeConfig.path) r--;
						else {
							if (o.component) break;
							r--;
						}
					}
				return (function SO(e) {
					return e.reduce(
						(t, n) => ({
							params: { ...t.params, ...n.params },
							data: { ...t.data, ...n.data },
							resolve: {
								...n.data,
								...t.resolve,
								...n.routeConfig?.data,
								...n._resolvedData,
							},
						}),
						{ params: {}, data: {}, resolve: {} }
					);
				})(n.slice(r));
			}
			class va {
				constructor(t, n, r, i, o, s, a, u, l, c, d) {
					(this.url = t),
						(this.params = n),
						(this.queryParams = r),
						(this.fragment = i),
						(this.data = o),
						(this.outlet = s),
						(this.component = a),
						(this.routeConfig = u),
						(this._urlSegment = l),
						(this._lastPathIndex = c),
						(this._resolve = d);
				}
				get title() {
					return this.data?.[eo];
				}
				get root() {
					return this._routerState.root;
				}
				get parent() {
					return this._routerState.parent(this);
				}
				get firstChild() {
					return this._routerState.firstChild(this);
				}
				get children() {
					return this._routerState.children(this);
				}
				get pathFromRoot() {
					return this._routerState.pathFromRoot(this);
				}
				get paramMap() {
					return (
						this._paramMap || (this._paramMap = Lr(this.params)), this._paramMap
					);
				}
				get queryParamMap() {
					return (
						this._queryParamMap || (this._queryParamMap = Lr(this.queryParams)),
						this._queryParamMap
					);
				}
				toString() {
					return `Route(url:'${this.url
						.map((r) => r.toString())
						.join("/")}', path:'${
						this.routeConfig ? this.routeConfig.path : ""
					}')`;
				}
			}
			class r_ extends Jy {
				constructor(t, n) {
					super(n), (this.url = t), Zc(this, n);
				}
				toString() {
					return i_(this._root);
				}
			}
			function Zc(e, t) {
				(t.value._routerState = e), t.children.forEach((n) => Zc(e, n));
			}
			function i_(e) {
				const t =
					e.children.length > 0 ? ` { ${e.children.map(i_).join(", ")} } ` : "";
				return `${e.value}${t}`;
			}
			function Kc(e) {
				if (e.snapshot) {
					const t = e.snapshot,
						n = e._futureSnapshot;
					(e.snapshot = n),
						$t(t.queryParams, n.queryParams) ||
							e.queryParams.next(n.queryParams),
						t.fragment !== n.fragment && e.fragment.next(n.fragment),
						$t(t.params, n.params) || e.params.next(n.params),
						(function U1(e, t) {
							if (e.length !== t.length) return !1;
							for (let n = 0; n < e.length; ++n) if (!$t(e[n], t[n])) return !1;
							return !0;
						})(t.url, n.url) || e.url.next(n.url),
						$t(t.data, n.data) || e.data.next(n.data);
				} else
					(e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
			}
			function Yc(e, t) {
				const n =
					$t(e.params, t.params) &&
					(function q1(e, t) {
						return (
							Hn(e, t) && e.every((n, r) => $t(n.parameters, t[r].parameters))
						);
					})(e.url, t.url);
				return (
					n &&
					!(!e.parent != !t.parent) &&
					(!e.parent || Yc(e.parent, t.parent))
				);
			}
			function ao(e, t, n) {
				if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
					const r = n.value;
					r._futureSnapshot = t.value;
					const i = (function TO(e, t, n) {
						return t.children.map((r) => {
							for (const i of n.children)
								if (e.shouldReuseRoute(r.value, i.value.snapshot))
									return ao(e, r, i);
							return ao(e, r);
						});
					})(e, t, n);
					return new un(r, i);
				}
				{
					if (e.shouldAttach(t.value)) {
						const o = e.retrieve(t.value);
						if (null !== o) {
							const s = o.route;
							return (
								(s.value._futureSnapshot = t.value),
								(s.children = t.children.map((a) => ao(e, a))),
								s
							);
						}
					}
					const r = (function OO(e) {
							return new Gn(
								new St(e.url),
								new St(e.params),
								new St(e.queryParams),
								new St(e.fragment),
								new St(e.data),
								e.outlet,
								e.component,
								e
							);
						})(t.value),
						i = t.children.map((o) => ao(e, o));
					return new un(r, i);
				}
			}
			const Xc = "ngNavigationCancelingError";
			function o_(e, t) {
				const { redirectTo: n, navigationBehaviorOptions: r } = zn(t)
						? { redirectTo: t, navigationBehaviorOptions: void 0 }
						: t,
					i = s_(!1, 0, t);
				return (i.url = n), (i.navigationBehaviorOptions = r), i;
			}
			function s_(e, t, n) {
				const r = new Error("NavigationCancelingError: " + (e || ""));
				return (r[Xc] = !0), (r.cancellationCode = t), n && (r.url = n), r;
			}
			function a_(e) {
				return u_(e) && zn(e.url);
			}
			function u_(e) {
				return e && e[Xc];
			}
			class AO {
				constructor() {
					(this.outlet = null),
						(this.route = null),
						(this.resolver = null),
						(this.injector = null),
						(this.children = new uo()),
						(this.attachRef = null);
				}
			}
			let uo = (() => {
				class e {
					constructor() {
						this.contexts = new Map();
					}
					onChildOutletCreated(n, r) {
						const i = this.getOrCreateContext(n);
						(i.outlet = r), this.contexts.set(n, i);
					}
					onChildOutletDestroyed(n) {
						const r = this.getContext(n);
						r && ((r.outlet = null), (r.attachRef = null));
					}
					onOutletDeactivated() {
						const n = this.contexts;
						return (this.contexts = new Map()), n;
					}
					onOutletReAttached(n) {
						this.contexts = n;
					}
					getOrCreateContext(n) {
						let r = this.getContext(n);
						return r || ((r = new AO()), this.contexts.set(n, r)), r;
					}
					getContext(n) {
						return this.contexts.get(n) || null;
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)();
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
					e
				);
			})();
			const ya = !1;
			let Jc = (() => {
				class e {
					constructor() {
						(this.activated = null),
							(this._activatedRoute = null),
							(this.name = z),
							(this.activateEvents = new qe()),
							(this.deactivateEvents = new qe()),
							(this.attachEvents = new qe()),
							(this.detachEvents = new qe()),
							(this.parentContexts = Q(uo)),
							(this.location = Q(bt)),
							(this.changeDetector = Q(tc)),
							(this.environmentInjector = Q(Yt));
					}
					ngOnChanges(n) {
						if (n.name) {
							const { firstChange: r, previousValue: i } = n.name;
							if (r) return;
							this.isTrackedInParentContexts(i) &&
								(this.deactivate(),
								this.parentContexts.onChildOutletDestroyed(i)),
								this.initializeOutletWithName();
						}
					}
					ngOnDestroy() {
						this.isTrackedInParentContexts(this.name) &&
							this.parentContexts.onChildOutletDestroyed(this.name);
					}
					isTrackedInParentContexts(n) {
						return this.parentContexts.getContext(n)?.outlet === this;
					}
					ngOnInit() {
						this.initializeOutletWithName();
					}
					initializeOutletWithName() {
						if (
							(this.parentContexts.onChildOutletCreated(this.name, this),
							this.activated)
						)
							return;
						const n = this.parentContexts.getContext(this.name);
						n?.route &&
							(n.attachRef
								? this.attach(n.attachRef, n.route)
								: this.activateWith(n.route, n.injector));
					}
					get isActivated() {
						return !!this.activated;
					}
					get component() {
						if (!this.activated) throw new w(4012, ya);
						return this.activated.instance;
					}
					get activatedRoute() {
						if (!this.activated) throw new w(4012, ya);
						return this._activatedRoute;
					}
					get activatedRouteData() {
						return this._activatedRoute
							? this._activatedRoute.snapshot.data
							: {};
					}
					detach() {
						if (!this.activated) throw new w(4012, ya);
						this.location.detach();
						const n = this.activated;
						return (
							(this.activated = null),
							(this._activatedRoute = null),
							this.detachEvents.emit(n.instance),
							n
						);
					}
					attach(n, r) {
						(this.activated = n),
							(this._activatedRoute = r),
							this.location.insert(n.hostView),
							this.attachEvents.emit(n.instance);
					}
					deactivate() {
						if (this.activated) {
							const n = this.component;
							this.activated.destroy(),
								(this.activated = null),
								(this._activatedRoute = null),
								this.deactivateEvents.emit(n);
						}
					}
					activateWith(n, r) {
						if (this.isActivated) throw new w(4013, ya);
						this._activatedRoute = n;
						const i = this.location,
							s = n.snapshot.component,
							a = this.parentContexts.getOrCreateContext(this.name).children,
							u = new xO(n, a, i.injector);
						if (
							r &&
							(function RO(e) {
								return !!e.resolveComponentFactory;
							})(r)
						) {
							const l = r.resolveComponentFactory(s);
							this.activated = i.createComponent(l, i.length, u);
						} else
							this.activated = i.createComponent(s, {
								index: i.length,
								injector: u,
								environmentInjector: r ?? this.environmentInjector,
							});
						this.changeDetector.markForCheck(),
							this.activateEvents.emit(this.activated.instance);
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)();
					}),
					(e.ɵdir = Ve({
						type: e,
						selectors: [["router-outlet"]],
						inputs: { name: "name" },
						outputs: {
							activateEvents: "activate",
							deactivateEvents: "deactivate",
							attachEvents: "attach",
							detachEvents: "detach",
						},
						exportAs: ["outlet"],
						standalone: !0,
						features: [Pn],
					})),
					e
				);
			})();
			class xO {
				constructor(t, n, r) {
					(this.route = t), (this.childContexts = n), (this.parent = r);
				}
				get(t, n) {
					return t === Gn
						? this.route
						: t === uo
						? this.childContexts
						: this.parent.get(t, n);
				}
			}
			let ed = (() => {
				class e {}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)();
					}),
					(e.ɵcmp = ue({
						type: e,
						selectors: [["ng-component"]],
						standalone: !0,
						features: [mm],
						decls: 1,
						vars: 0,
						template: function (n, r) {
							1 & n && $(0, "router-outlet");
						},
						dependencies: [Jc],
						encapsulation: 2,
					})),
					e
				);
			})();
			function l_(e, t) {
				return (
					e.providers &&
						!e._injector &&
						(e._injector = Fs(e.providers, t, `Route: ${e.path}`)),
					e._injector ?? t
				);
			}
			function nd(e) {
				const t = e.children && e.children.map(nd),
					n = t ? { ...e, children: t } : { ...e };
				return (
					!n.component &&
						!n.loadComponent &&
						(t || n.loadChildren) &&
						n.outlet &&
						n.outlet !== z &&
						(n.component = ed),
					n
				);
			}
			function gt(e) {
				return e.outlet || z;
			}
			function c_(e, t) {
				const n = e.filter((r) => gt(r) === t);
				return n.push(...e.filter((r) => gt(r) !== t)), n;
			}
			function lo(e) {
				if (!e) return null;
				if (e.routeConfig?._injector) return e.routeConfig._injector;
				for (let t = e.parent; t; t = t.parent) {
					const n = t.routeConfig;
					if (n?._loadedInjector) return n._loadedInjector;
					if (n?._injector) return n._injector;
				}
				return null;
			}
			class jO {
				constructor(t, n, r, i) {
					(this.routeReuseStrategy = t),
						(this.futureState = n),
						(this.currState = r),
						(this.forwardEvent = i);
				}
				activate(t) {
					const n = this.futureState._root,
						r = this.currState ? this.currState._root : null;
					this.deactivateChildRoutes(n, r, t),
						Kc(this.futureState.root),
						this.activateChildRoutes(n, r, t);
				}
				deactivateChildRoutes(t, n, r) {
					const i = $r(n);
					t.children.forEach((o) => {
						const s = o.value.outlet;
						this.deactivateRoutes(o, i[s], r), delete i[s];
					}),
						xe(i, (o, s) => {
							this.deactivateRouteAndItsChildren(o, r);
						});
				}
				deactivateRoutes(t, n, r) {
					const i = t.value,
						o = n ? n.value : null;
					if (i === o)
						if (i.component) {
							const s = r.getContext(i.outlet);
							s && this.deactivateChildRoutes(t, n, s.children);
						} else this.deactivateChildRoutes(t, n, r);
					else o && this.deactivateRouteAndItsChildren(n, r);
				}
				deactivateRouteAndItsChildren(t, n) {
					t.value.component &&
					this.routeReuseStrategy.shouldDetach(t.value.snapshot)
						? this.detachAndStoreRouteSubtree(t, n)
						: this.deactivateRouteAndOutlet(t, n);
				}
				detachAndStoreRouteSubtree(t, n) {
					const r = n.getContext(t.value.outlet),
						i = r && t.value.component ? r.children : n,
						o = $r(t);
					for (const s of Object.keys(o))
						this.deactivateRouteAndItsChildren(o[s], i);
					if (r && r.outlet) {
						const s = r.outlet.detach(),
							a = r.children.onOutletDeactivated();
						this.routeReuseStrategy.store(t.value.snapshot, {
							componentRef: s,
							route: t,
							contexts: a,
						});
					}
				}
				deactivateRouteAndOutlet(t, n) {
					const r = n.getContext(t.value.outlet),
						i = r && t.value.component ? r.children : n,
						o = $r(t);
					for (const s of Object.keys(o))
						this.deactivateRouteAndItsChildren(o[s], i);
					r &&
						r.outlet &&
						(r.outlet.deactivate(),
						r.children.onOutletDeactivated(),
						(r.attachRef = null),
						(r.resolver = null),
						(r.route = null));
				}
				activateChildRoutes(t, n, r) {
					const i = $r(n);
					t.children.forEach((o) => {
						this.activateRoutes(o, i[o.value.outlet], r),
							this.forwardEvent(new wO(o.value.snapshot));
					}),
						t.children.length && this.forwardEvent(new CO(t.value.snapshot));
				}
				activateRoutes(t, n, r) {
					const i = t.value,
						o = n ? n.value : null;
					if ((Kc(i), i === o))
						if (i.component) {
							const s = r.getOrCreateContext(i.outlet);
							this.activateChildRoutes(t, n, s.children);
						} else this.activateChildRoutes(t, n, r);
					else if (i.component) {
						const s = r.getOrCreateContext(i.outlet);
						if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
							const a = this.routeReuseStrategy.retrieve(i.snapshot);
							this.routeReuseStrategy.store(i.snapshot, null),
								s.children.onOutletReAttached(a.contexts),
								(s.attachRef = a.componentRef),
								(s.route = a.route.value),
								s.outlet && s.outlet.attach(a.componentRef, a.route.value),
								Kc(a.route.value),
								this.activateChildRoutes(t, null, s.children);
						} else {
							const a = lo(i.snapshot),
								u = a?.get(Pi) ?? null;
							(s.attachRef = null),
								(s.route = i),
								(s.resolver = u),
								(s.injector = a),
								s.outlet && s.outlet.activateWith(i, s.injector),
								this.activateChildRoutes(t, null, s.children);
						}
					} else this.activateChildRoutes(t, null, r);
				}
			}
			class d_ {
				constructor(t) {
					(this.path = t), (this.route = this.path[this.path.length - 1]);
				}
			}
			class _a {
				constructor(t, n) {
					(this.component = t), (this.route = n);
				}
			}
			function VO(e, t, n) {
				const r = e._root;
				return co(r, t ? t._root : null, n, [r.value]);
			}
			function Ur(e, t) {
				const n = Symbol(),
					r = t.get(e, n);
				return r === n
					? "function" != typeof e ||
					  (function AC(e) {
							return null !== Lo(e);
					  })(e)
						? t.get(e)
						: e
					: r;
			}
			function co(
				e,
				t,
				n,
				r,
				i = { canDeactivateChecks: [], canActivateChecks: [] }
			) {
				const o = $r(t);
				return (
					e.children.forEach((s) => {
						(function UO(
							e,
							t,
							n,
							r,
							i = { canDeactivateChecks: [], canActivateChecks: [] }
						) {
							const o = e.value,
								s = t ? t.value : null,
								a = n ? n.getContext(e.value.outlet) : null;
							if (s && o.routeConfig === s.routeConfig) {
								const u = (function BO(e, t, n) {
									if ("function" == typeof n) return n(e, t);
									switch (n) {
										case "pathParamsChange":
											return !Hn(e.url, t.url);
										case "pathParamsOrQueryParamsChange":
											return (
												!Hn(e.url, t.url) || !$t(e.queryParams, t.queryParams)
											);
										case "always":
											return !0;
										case "paramsOrQueryParamsChange":
											return !Yc(e, t) || !$t(e.queryParams, t.queryParams);
										default:
											return !Yc(e, t);
									}
								})(s, o, o.routeConfig.runGuardsAndResolvers);
								u
									? i.canActivateChecks.push(new d_(r))
									: ((o.data = s.data), (o._resolvedData = s._resolvedData)),
									co(e, t, o.component ? (a ? a.children : null) : n, r, i),
									u &&
										a &&
										a.outlet &&
										a.outlet.isActivated &&
										i.canDeactivateChecks.push(new _a(a.outlet.component, s));
							} else
								s && fo(t, a, i),
									i.canActivateChecks.push(new d_(r)),
									co(e, null, o.component ? (a ? a.children : null) : n, r, i);
						})(s, o[s.value.outlet], n, r.concat([s.value]), i),
							delete o[s.value.outlet];
					}),
					xe(o, (s, a) => fo(s, n.getContext(a), i)),
					i
				);
			}
			function fo(e, t, n) {
				const r = $r(e),
					i = e.value;
				xe(r, (o, s) => {
					fo(o, i.component ? (t ? t.children.getContext(s) : null) : t, n);
				}),
					n.canDeactivateChecks.push(
						new _a(
							i.component && t && t.outlet && t.outlet.isActivated
								? t.outlet.component
								: null,
							i
						)
					);
			}
			function ho(e) {
				return "function" == typeof e;
			}
			function rd(e) {
				return e instanceof aa || "EmptyError" === e?.name;
			}
			const Ca = Symbol("INITIAL_VALUE");
			function Br() {
				return Vt((e) =>
					Sy(
						e.map((t) =>
							t.pipe(
								Ji(1),
								(function N1(...e) {
									const t = ri(e);
									return Ie((n, r) => {
										(t ? kc(e, n, t) : kc(e, n)).subscribe(r);
									});
								})(Ca)
							)
						)
					).pipe(
						W((t) => {
							for (const n of t)
								if (!0 !== n) {
									if (n === Ca) return Ca;
									if (!1 === n || n instanceof Bn) return n;
								}
							return !0;
						}),
						yn((t) => t !== Ca),
						Ji(1)
					)
				);
			}
			function f_(e) {
				return (function Z_(...e) {
					return yd(e);
				})(
					je((t) => {
						if (zn(t)) throw o_(0, t);
					}),
					W((t) => !0 === t)
				);
			}
			const id = {
				matched: !1,
				consumedSegments: [],
				remainingSegments: [],
				parameters: {},
				positionalParamSegments: {},
			};
			function h_(e, t, n, r, i) {
				const o = od(e, t, n);
				return o.matched
					? (function oA(e, t, n, r) {
							const i = t.canMatch;
							return i && 0 !== i.length
								? O(
										i.map((s) => {
											const a = Ur(s, e);
											return Dn(
												(function QO(e) {
													return e && ho(e.canMatch);
												})(a)
													? a.canMatch(t, n)
													: e.runInContext(() => a(t, n))
											);
										})
								  ).pipe(Br(), f_())
								: O(!0);
					  })((r = l_(t, r)), t, n).pipe(W((s) => (!0 === s ? o : { ...id })))
					: O(o);
			}
			function od(e, t, n) {
				if ("" === t.path)
					return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
						? { ...id }
						: {
								matched: !0,
								consumedSegments: [],
								remainingSegments: n,
								parameters: {},
								positionalParamSegments: {},
						  };
				const i = (t.matcher || $1)(n, e, t);
				if (!i) return { ...id };
				const o = {};
				xe(i.posParams, (a, u) => {
					o[u] = a.path;
				});
				const s =
					i.consumed.length > 0
						? { ...o, ...i.consumed[i.consumed.length - 1].parameters }
						: o;
				return {
					matched: !0,
					consumedSegments: i.consumed,
					remainingSegments: n.slice(i.consumed.length),
					parameters: s,
					positionalParamSegments: i.posParams ?? {},
				};
			}
			function Da(e, t, n, r) {
				if (
					n.length > 0 &&
					(function uA(e, t, n) {
						return n.some((r) => wa(e, t, r) && gt(r) !== z);
					})(e, n, r)
				) {
					const o = new q(
						t,
						(function aA(e, t, n, r) {
							const i = {};
							(i[z] = r),
								(r._sourceSegment = e),
								(r._segmentIndexShift = t.length);
							for (const o of n)
								if ("" === o.path && gt(o) !== z) {
									const s = new q([], {});
									(s._sourceSegment = e),
										(s._segmentIndexShift = t.length),
										(i[gt(o)] = s);
								}
							return i;
						})(e, t, r, new q(n, e.children))
					);
					return (
						(o._sourceSegment = e),
						(o._segmentIndexShift = t.length),
						{ segmentGroup: o, slicedSegments: [] }
					);
				}
				if (
					0 === n.length &&
					(function lA(e, t, n) {
						return n.some((r) => wa(e, t, r));
					})(e, n, r)
				) {
					const o = new q(
						e.segments,
						(function sA(e, t, n, r, i) {
							const o = {};
							for (const s of r)
								if (wa(e, n, s) && !i[gt(s)]) {
									const a = new q([], {});
									(a._sourceSegment = e),
										(a._segmentIndexShift = t.length),
										(o[gt(s)] = a);
								}
							return { ...i, ...o };
						})(e, t, n, r, e.children)
					);
					return (
						(o._sourceSegment = e),
						(o._segmentIndexShift = t.length),
						{ segmentGroup: o, slicedSegments: n }
					);
				}
				const i = new q(e.segments, e.children);
				return (
					(i._sourceSegment = e),
					(i._segmentIndexShift = t.length),
					{ segmentGroup: i, slicedSegments: n }
				);
			}
			function wa(e, t, n) {
				return (
					(!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
					"" === n.path
				);
			}
			function p_(e, t, n, r) {
				return (
					!!(gt(e) === r || (r !== z && wa(t, n, e))) &&
					("**" === e.path || od(t, e, n).matched)
				);
			}
			function g_(e, t, n) {
				return 0 === t.length && !e.children[n];
			}
			const ba = !1;
			class Ma {
				constructor(t) {
					this.segmentGroup = t || null;
				}
			}
			class m_ {
				constructor(t) {
					this.urlTree = t;
				}
			}
			function po(e) {
				return Xi(new Ma(e));
			}
			function v_(e) {
				return Xi(new m_(e));
			}
			class hA {
				constructor(t, n, r, i, o) {
					(this.injector = t),
						(this.configLoader = n),
						(this.urlSerializer = r),
						(this.urlTree = i),
						(this.config = o),
						(this.allowRedirects = !0);
				}
				apply() {
					const t = Da(this.urlTree.root, [], [], this.config).segmentGroup,
						n = new q(t.segments, t.children);
					return this.expandSegmentGroup(this.injector, this.config, n, z)
						.pipe(
							W((o) =>
								this.createUrlTree(
									ga(o),
									this.urlTree.queryParams,
									this.urlTree.fragment
								)
							)
						)
						.pipe(
							Cn((o) => {
								if (o instanceof m_)
									return (this.allowRedirects = !1), this.match(o.urlTree);
								throw o instanceof Ma ? this.noMatchError(o) : o;
							})
						);
				}
				match(t) {
					return this.expandSegmentGroup(this.injector, this.config, t.root, z)
						.pipe(
							W((i) => this.createUrlTree(ga(i), t.queryParams, t.fragment))
						)
						.pipe(
							Cn((i) => {
								throw i instanceof Ma ? this.noMatchError(i) : i;
							})
						);
				}
				noMatchError(t) {
					return new w(4002, ba);
				}
				createUrlTree(t, n, r) {
					const i = Bc(t);
					return new Bn(i, n, r);
				}
				expandSegmentGroup(t, n, r, i) {
					return 0 === r.segments.length && r.hasChildren()
						? this.expandChildren(t, n, r).pipe(W((o) => new q([], o)))
						: this.expandSegment(t, r, n, r.segments, i, !0);
				}
				expandChildren(t, n, r) {
					const i = [];
					for (const o of Object.keys(r.children))
						"primary" === o ? i.unshift(o) : i.push(o);
					return De(i).pipe(
						Un((o) => {
							const s = r.children[o],
								a = c_(n, o);
							return this.expandSegmentGroup(t, a, s, o).pipe(
								W((u) => ({ segment: u, outlet: o }))
							);
						}),
						xy((o, s) => ((o[s.outlet] = s.segment), o), {}),
						Ry()
					);
				}
				expandSegment(t, n, r, i, o, s) {
					return De(r).pipe(
						Un((a) =>
							this.expandSegmentAgainstRoute(t, n, r, a, i, o, s).pipe(
								Cn((l) => {
									if (l instanceof Ma) return O(null);
									throw l;
								})
							)
						),
						_n((a) => !!a),
						Cn((a, u) => {
							if (rd(a)) return g_(n, i, o) ? O(new q([], {})) : po(n);
							throw a;
						})
					);
				}
				expandSegmentAgainstRoute(t, n, r, i, o, s, a) {
					return p_(i, n, o, s)
						? void 0 === i.redirectTo
							? this.matchSegmentAgainstRoute(t, n, i, o, s)
							: a && this.allowRedirects
							? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s)
							: po(n)
						: po(n);
				}
				expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
					return "**" === i.path
						? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, i, s)
						: this.expandRegularSegmentAgainstRouteUsingRedirect(
								t,
								n,
								r,
								i,
								o,
								s
						  );
				}
				expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i) {
					const o = this.applyRedirectCommands([], r.redirectTo, {});
					return r.redirectTo.startsWith("/")
						? v_(o)
						: this.lineralizeSegments(r, o).pipe(
								Pe((s) => {
									const a = new q(s, {});
									return this.expandSegment(t, a, n, s, i, !1);
								})
						  );
				}
				expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
					const {
						matched: a,
						consumedSegments: u,
						remainingSegments: l,
						positionalParamSegments: c,
					} = od(n, i, o);
					if (!a) return po(n);
					const d = this.applyRedirectCommands(u, i.redirectTo, c);
					return i.redirectTo.startsWith("/")
						? v_(d)
						: this.lineralizeSegments(i, d).pipe(
								Pe((f) => this.expandSegment(t, n, r, f.concat(l), s, !1))
						  );
				}
				matchSegmentAgainstRoute(t, n, r, i, o) {
					return "**" === r.path
						? ((t = l_(r, t)),
						  r.loadChildren
								? (r._loadedRoutes
										? O({
												routes: r._loadedRoutes,
												injector: r._loadedInjector,
										  })
										: this.configLoader.loadChildren(t, r)
								  ).pipe(
										W(
											(a) => (
												(r._loadedRoutes = a.routes),
												(r._loadedInjector = a.injector),
												new q(i, {})
											)
										)
								  )
								: O(new q(i, {})))
						: h_(n, r, i, t).pipe(
								Vt(
									({ matched: s, consumedSegments: a, remainingSegments: u }) =>
										s
											? this.getChildConfig((t = r._injector ?? t), r, i).pipe(
													Pe((c) => {
														const d = c.injector ?? t,
															f = c.routes,
															{ segmentGroup: h, slicedSegments: p } = Da(
																n,
																a,
																u,
																f
															),
															g = new q(h.segments, h.children);
														if (0 === p.length && g.hasChildren())
															return this.expandChildren(d, f, g).pipe(
																W((m) => new q(a, m))
															);
														if (0 === f.length && 0 === p.length)
															return O(new q(a, {}));
														const y = gt(r) === o;
														return this.expandSegment(
															d,
															g,
															f,
															p,
															y ? z : o,
															!0
														).pipe(
															W((M) => new q(a.concat(M.segments), M.children))
														);
													})
											  )
											: po(n)
								)
						  );
				}
				getChildConfig(t, n, r) {
					return n.children
						? O({ routes: n.children, injector: t })
						: n.loadChildren
						? void 0 !== n._loadedRoutes
							? O({ routes: n._loadedRoutes, injector: n._loadedInjector })
							: (function iA(e, t, n, r) {
									const i = t.canLoad;
									return void 0 === i || 0 === i.length
										? O(!0)
										: O(
												i.map((s) => {
													const a = Ur(s, e);
													return Dn(
														(function zO(e) {
															return e && ho(e.canLoad);
														})(a)
															? a.canLoad(t, n)
															: e.runInContext(() => a(t, n))
													);
												})
										  ).pipe(Br(), f_());
							  })(t, n, r).pipe(
									Pe((i) =>
										i
											? this.configLoader.loadChildren(t, n).pipe(
													je((o) => {
														(n._loadedRoutes = o.routes),
															(n._loadedInjector = o.injector);
													})
											  )
											: (function dA(e) {
													return Xi(s_(ba, 3));
											  })()
									)
							  )
						: O({ routes: [], injector: t });
				}
				lineralizeSegments(t, n) {
					let r = [],
						i = n.root;
					for (;;) {
						if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
							return O(r);
						if (i.numberOfChildren > 1 || !i.children[z])
							return Xi(new w(4e3, ba));
						i = i.children[z];
					}
				}
				applyRedirectCommands(t, n, r) {
					return this.applyRedirectCreateUrlTree(
						n,
						this.urlSerializer.parse(n),
						t,
						r
					);
				}
				applyRedirectCreateUrlTree(t, n, r, i) {
					const o = this.createSegmentGroup(t, n.root, r, i);
					return new Bn(
						o,
						this.createQueryParams(n.queryParams, this.urlTree.queryParams),
						n.fragment
					);
				}
				createQueryParams(t, n) {
					const r = {};
					return (
						xe(t, (i, o) => {
							if ("string" == typeof i && i.startsWith(":")) {
								const a = i.substring(1);
								r[o] = n[a];
							} else r[o] = i;
						}),
						r
					);
				}
				createSegmentGroup(t, n, r, i) {
					const o = this.createSegments(t, n.segments, r, i);
					let s = {};
					return (
						xe(n.children, (a, u) => {
							s[u] = this.createSegmentGroup(t, a, r, i);
						}),
						new q(o, s)
					);
				}
				createSegments(t, n, r, i) {
					return n.map((o) =>
						o.path.startsWith(":")
							? this.findPosParam(t, o, i)
							: this.findOrReturn(o, r)
					);
				}
				findPosParam(t, n, r) {
					const i = r[n.path.substring(1)];
					if (!i) throw new w(4001, ba);
					return i;
				}
				findOrReturn(t, n) {
					let r = 0;
					for (const i of n) {
						if (i.path === t.path) return n.splice(r), i;
						r++;
					}
					return t;
				}
			}
			class gA {}
			class yA {
				constructor(t, n, r, i, o, s, a) {
					(this.injector = t),
						(this.rootComponentType = n),
						(this.config = r),
						(this.urlTree = i),
						(this.url = o),
						(this.paramsInheritanceStrategy = s),
						(this.urlSerializer = a);
				}
				recognize() {
					const t = Da(
						this.urlTree.root,
						[],
						[],
						this.config.filter((n) => void 0 === n.redirectTo)
					).segmentGroup;
					return this.processSegmentGroup(
						this.injector,
						this.config,
						t,
						z
					).pipe(
						W((n) => {
							if (null === n) return null;
							const r = new va(
									[],
									Object.freeze({}),
									Object.freeze({ ...this.urlTree.queryParams }),
									this.urlTree.fragment,
									{},
									z,
									this.rootComponentType,
									null,
									this.urlTree.root,
									-1,
									{}
								),
								i = new un(r, n),
								o = new r_(this.url, i);
							return this.inheritParamsAndData(o._root), o;
						})
					);
				}
				inheritParamsAndData(t) {
					const n = t.value,
						r = n_(n, this.paramsInheritanceStrategy);
					(n.params = Object.freeze(r.params)),
						(n.data = Object.freeze(r.data)),
						t.children.forEach((i) => this.inheritParamsAndData(i));
				}
				processSegmentGroup(t, n, r, i) {
					return 0 === r.segments.length && r.hasChildren()
						? this.processChildren(t, n, r)
						: this.processSegment(t, n, r, r.segments, i);
				}
				processChildren(t, n, r) {
					return De(Object.keys(r.children)).pipe(
						Un((i) => {
							const o = r.children[i],
								s = c_(n, i);
							return this.processSegmentGroup(t, s, o, i);
						}),
						xy((i, o) => (i && o ? (i.push(...o), i) : null)),
						(function L1(e, t = !1) {
							return Ie((n, r) => {
								let i = 0;
								n.subscribe(
									Se(r, (o) => {
										const s = e(o, i++);
										(s || t) && r.next(o), !s && r.complete();
									})
								);
							});
						})((i) => null !== i),
						ua(null),
						Ry(),
						W((i) => {
							if (null === i) return null;
							const o = __(i);
							return (
								(function _A(e) {
									e.sort((t, n) =>
										t.value.outlet === z
											? -1
											: n.value.outlet === z
											? 1
											: t.value.outlet.localeCompare(n.value.outlet)
									);
								})(o),
								o
							);
						})
					);
				}
				processSegment(t, n, r, i, o) {
					return De(n).pipe(
						Un((s) =>
							this.processSegmentAgainstRoute(s._injector ?? t, s, r, i, o)
						),
						_n((s) => !!s),
						Cn((s) => {
							if (rd(s)) return g_(r, i, o) ? O([]) : O(null);
							throw s;
						})
					);
				}
				processSegmentAgainstRoute(t, n, r, i, o) {
					if (n.redirectTo || !p_(n, r, i, o)) return O(null);
					let s;
					if ("**" === n.path) {
						const a = i.length > 0 ? ky(i).parameters : {},
							u = D_(r) + i.length;
						s = O({
							snapshot: new va(
								i,
								a,
								Object.freeze({ ...this.urlTree.queryParams }),
								this.urlTree.fragment,
								w_(n),
								gt(n),
								n.component ?? n._loadedComponent ?? null,
								n,
								C_(r),
								u,
								b_(n)
							),
							consumedSegments: [],
							remainingSegments: [],
						});
					} else
						s = h_(r, n, i, t).pipe(
							W(
								({
									matched: a,
									consumedSegments: u,
									remainingSegments: l,
									parameters: c,
								}) => {
									if (!a) return null;
									const d = D_(r) + u.length;
									return {
										snapshot: new va(
											u,
											c,
											Object.freeze({ ...this.urlTree.queryParams }),
											this.urlTree.fragment,
											w_(n),
											gt(n),
											n.component ?? n._loadedComponent ?? null,
											n,
											C_(r),
											d,
											b_(n)
										),
										consumedSegments: u,
										remainingSegments: l,
									};
								}
							)
						);
					return s.pipe(
						Vt((a) => {
							if (null === a) return O(null);
							const {
								snapshot: u,
								consumedSegments: l,
								remainingSegments: c,
							} = a;
							t = n._injector ?? t;
							const d = n._loadedInjector ?? t,
								f = (function CA(e) {
									return e.children
										? e.children
										: e.loadChildren
										? e._loadedRoutes
										: [];
								})(n),
								{ segmentGroup: h, slicedSegments: p } = Da(
									r,
									l,
									c,
									f.filter((y) => void 0 === y.redirectTo)
								);
							if (0 === p.length && h.hasChildren())
								return this.processChildren(d, f, h).pipe(
									W((y) => (null === y ? null : [new un(u, y)]))
								);
							if (0 === f.length && 0 === p.length) return O([new un(u, [])]);
							const g = gt(n) === o;
							return this.processSegment(d, f, h, p, g ? z : o).pipe(
								W((y) => (null === y ? null : [new un(u, y)]))
							);
						})
					);
				}
			}
			function DA(e) {
				const t = e.value.routeConfig;
				return t && "" === t.path && void 0 === t.redirectTo;
			}
			function __(e) {
				const t = [],
					n = new Set();
				for (const r of e) {
					if (!DA(r)) {
						t.push(r);
						continue;
					}
					const i = t.find((o) => r.value.routeConfig === o.value.routeConfig);
					void 0 !== i ? (i.children.push(...r.children), n.add(i)) : t.push(r);
				}
				for (const r of n) {
					const i = __(r.children);
					t.push(new un(r.value, i));
				}
				return t.filter((r) => !n.has(r));
			}
			function C_(e) {
				let t = e;
				for (; t._sourceSegment; ) t = t._sourceSegment;
				return t;
			}
			function D_(e) {
				let t = e,
					n = t._segmentIndexShift ?? 0;
				for (; t._sourceSegment; )
					(t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
				return n - 1;
			}
			function w_(e) {
				return e.data || {};
			}
			function b_(e) {
				return e.resolve || {};
			}
			function M_(e) {
				return "string" == typeof e.title || null === e.title;
			}
			function sd(e) {
				return Vt((t) => {
					const n = e(t);
					return n ? De(n).pipe(W(() => t)) : O(t);
				});
			}
			const Hr = new F("ROUTES");
			let ad = (() => {
				class e {
					constructor(n, r) {
						(this.injector = n),
							(this.compiler = r),
							(this.componentLoaders = new WeakMap()),
							(this.childrenLoaders = new WeakMap());
					}
					loadComponent(n) {
						if (this.componentLoaders.get(n))
							return this.componentLoaders.get(n);
						if (n._loadedComponent) return O(n._loadedComponent);
						this.onLoadStartListener && this.onLoadStartListener(n);
						const r = Dn(n.loadComponent()).pipe(
								W(I_),
								je((o) => {
									this.onLoadEndListener && this.onLoadEndListener(n),
										(n._loadedComponent = o);
								}),
								Vc(() => {
									this.componentLoaders.delete(n);
								})
							),
							i = new Oy(r, () => new Ut()).pipe(Lc());
						return this.componentLoaders.set(n, i), i;
					}
					loadChildren(n, r) {
						if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
						if (r._loadedRoutes)
							return O({
								routes: r._loadedRoutes,
								injector: r._loadedInjector,
							});
						this.onLoadStartListener && this.onLoadStartListener(r);
						const o = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
								W((a) => {
									this.onLoadEndListener && this.onLoadEndListener(r);
									let u,
										l,
										c = !1;
									Array.isArray(a)
										? (l = a)
										: ((u = a.create(n).injector),
										  (l = Fy(u.get(Hr, [], x.Self | x.Optional))));
									return { routes: l.map(nd), injector: u };
								}),
								Vc(() => {
									this.childrenLoaders.delete(r);
								})
							),
							s = new Oy(o, () => new Ut()).pipe(Lc());
						return this.childrenLoaders.set(r, s), s;
					}
					loadModuleFactoryOrRoutes(n) {
						return Dn(n()).pipe(
							W(I_),
							Pe((i) =>
								i instanceof pm || Array.isArray(i)
									? O(i)
									: De(this.compiler.compileModuleAsync(i))
							)
						);
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(S(Nt), S(uv));
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
					e
				);
			})();
			function I_(e) {
				return (function OA(e) {
					return e && "object" == typeof e && "default" in e;
				})(e)
					? e.default
					: e;
			}
			let ud = (() => {
				class e {
					constructor() {
						(this.currentNavigation = null),
							(this.lastSuccessfulNavigation = null),
							(this.events = new Ut()),
							(this.configLoader = Q(ad)),
							(this.environmentInjector = Q(Yt)),
							(this.urlSerializer = Q(no)),
							(this.rootContexts = Q(uo)),
							(this.navigationId = 0),
							(this.configLoader.onLoadEndListener = (i) =>
								this.events.next(new yO(i))),
							(this.configLoader.onLoadStartListener = (i) =>
								this.events.next(new vO(i)));
					}
					get hasRequestedNavigation() {
						return 0 !== this.navigationId;
					}
					complete() {
						this.transitions?.complete();
					}
					handleNavigationRequest(n) {
						const r = ++this.navigationId;
						this.transitions?.next({ ...this.transitions.value, ...n, id: r });
					}
					setupNavigations(n) {
						return (
							(this.transitions = new St({
								id: 0,
								targetPageId: 0,
								currentUrlTree: n.currentUrlTree,
								currentRawUrl: n.currentUrlTree,
								extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
								urlAfterRedirects: n.urlHandlingStrategy.extract(
									n.currentUrlTree
								),
								rawUrl: n.currentUrlTree,
								extras: {},
								resolve: null,
								reject: null,
								promise: Promise.resolve(!0),
								source: "imperative",
								restoredState: null,
								currentSnapshot: n.routerState.snapshot,
								targetSnapshot: null,
								currentRouterState: n.routerState,
								targetRouterState: null,
								guards: { canActivateChecks: [], canDeactivateChecks: [] },
								guardsResult: null,
							})),
							this.transitions.pipe(
								yn((r) => 0 !== r.id),
								W((r) => ({
									...r,
									extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
								})),
								Vt((r) => {
									let i = !1,
										o = !1;
									return O(r).pipe(
										je((s) => {
											this.currentNavigation = {
												id: s.id,
												initialUrl: s.rawUrl,
												extractedUrl: s.extractedUrl,
												trigger: s.source,
												extras: s.extras,
												previousNavigation: this.lastSuccessfulNavigation
													? {
															...this.lastSuccessfulNavigation,
															previousNavigation: null,
													  }
													: null,
											};
										}),
										Vt((s) => {
											const a = n.browserUrlTree.toString(),
												u =
													!n.navigated ||
													s.extractedUrl.toString() !== a ||
													a !== n.currentUrlTree.toString();
											if (
												("reload" === n.onSameUrlNavigation || u) &&
												n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl)
											)
												return (
													P_(s.source) && (n.browserUrlTree = s.extractedUrl),
													O(s).pipe(
														Vt((c) => {
															const d = this.transitions?.getValue();
															return (
																this.events.next(
																	new Gc(
																		c.id,
																		this.urlSerializer.serialize(
																			c.extractedUrl
																		),
																		c.source,
																		c.restoredState
																	)
																),
																d !== this.transitions?.getValue()
																	? Ht
																	: Promise.resolve(c)
															);
														}),
														(function pA(e, t, n, r) {
															return Vt((i) =>
																(function fA(e, t, n, r, i) {
																	return new hA(e, t, n, r, i).apply();
																})(e, t, n, i.extractedUrl, r).pipe(
																	W((o) => ({ ...i, urlAfterRedirects: o }))
																)
															);
														})(
															this.environmentInjector,
															this.configLoader,
															this.urlSerializer,
															n.config
														),
														je((c) => {
															(this.currentNavigation = {
																...this.currentNavigation,
																finalUrl: c.urlAfterRedirects,
															}),
																(r.urlAfterRedirects = c.urlAfterRedirects);
														}),
														(function bA(e, t, n, r, i) {
															return Pe((o) =>
																(function vA(
																	e,
																	t,
																	n,
																	r,
																	i,
																	o,
																	s = "emptyOnly"
																) {
																	return new yA(e, t, n, r, i, s, o)
																		.recognize()
																		.pipe(
																			Vt((a) =>
																				null === a
																					? (function mA(e) {
																							return new Ce((t) => t.error(e));
																					  })(new gA())
																					: O(a)
																			)
																		);
																})(
																	e,
																	t,
																	n,
																	o.urlAfterRedirects,
																	r.serialize(o.urlAfterRedirects),
																	r,
																	i
																).pipe(W((s) => ({ ...o, targetSnapshot: s })))
															);
														})(
															this.environmentInjector,
															n.rootComponentType,
															n.config,
															this.urlSerializer,
															n.paramsInheritanceStrategy
														),
														je((c) => {
															if (
																((r.targetSnapshot = c.targetSnapshot),
																"eager" === n.urlUpdateStrategy)
															) {
																if (!c.extras.skipLocationChange) {
																	const f = n.urlHandlingStrategy.merge(
																		c.urlAfterRedirects,
																		c.rawUrl
																	);
																	n.setBrowserUrl(f, c);
																}
																n.browserUrlTree = c.urlAfterRedirects;
															}
															const d = new fO(
																c.id,
																this.urlSerializer.serialize(c.extractedUrl),
																this.urlSerializer.serialize(
																	c.urlAfterRedirects
																),
																c.targetSnapshot
															);
															this.events.next(d);
														})
													)
												);
											if (
												u &&
												n.rawUrlTree &&
												n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
											) {
												const {
														id: d,
														extractedUrl: f,
														source: h,
														restoredState: p,
														extras: g,
													} = s,
													y = new Gc(d, this.urlSerializer.serialize(f), h, p);
												this.events.next(y);
												const _ = t_(f, n.rootComponentType).snapshot;
												return O(
													(r = {
														...s,
														targetSnapshot: _,
														urlAfterRedirects: f,
														extras: {
															...g,
															skipLocationChange: !1,
															replaceUrl: !1,
														},
													})
												);
											}
											return (n.rawUrlTree = s.rawUrl), s.resolve(null), Ht;
										}),
										je((s) => {
											const a = new hO(
												s.id,
												this.urlSerializer.serialize(s.extractedUrl),
												this.urlSerializer.serialize(s.urlAfterRedirects),
												s.targetSnapshot
											);
											this.events.next(a);
										}),
										W(
											(s) =>
												(r = {
													...s,
													guards: VO(
														s.targetSnapshot,
														s.currentSnapshot,
														this.rootContexts
													),
												})
										),
										(function KO(e, t) {
											return Pe((n) => {
												const {
													targetSnapshot: r,
													currentSnapshot: i,
													guards: {
														canActivateChecks: o,
														canDeactivateChecks: s,
													},
												} = n;
												return 0 === s.length && 0 === o.length
													? O({ ...n, guardsResult: !0 })
													: (function YO(e, t, n, r) {
															return De(e).pipe(
																Pe((i) =>
																	(function rA(e, t, n, r, i) {
																		const o =
																			t && t.routeConfig
																				? t.routeConfig.canDeactivate
																				: null;
																		return o && 0 !== o.length
																			? O(
																					o.map((a) => {
																						const u = lo(t) ?? i,
																							l = Ur(a, u);
																						return Dn(
																							(function WO(e) {
																								return e && ho(e.canDeactivate);
																							})(l)
																								? l.canDeactivate(e, t, n, r)
																								: u.runInContext(() =>
																										l(e, t, n, r)
																								  )
																						).pipe(_n());
																					})
																			  ).pipe(Br())
																			: O(!0);
																	})(i.component, i.route, n, t, r)
																),
																_n((i) => !0 !== i, !0)
															);
													  })(s, r, i, e).pipe(
															Pe((a) =>
																a &&
																(function HO(e) {
																	return "boolean" == typeof e;
																})(a)
																	? (function XO(e, t, n, r) {
																			return De(t).pipe(
																				Un((i) =>
																					kc(
																						(function eA(e, t) {
																							return (
																								null !== e && t && t(new _O(e)),
																								O(!0)
																							);
																						})(i.route.parent, r),
																						(function JO(e, t) {
																							return (
																								null !== e && t && t(new DO(e)),
																								O(!0)
																							);
																						})(i.route, r),
																						(function nA(e, t, n) {
																							const r = t[t.length - 1],
																								o = t
																									.slice(0, t.length - 1)
																									.reverse()
																									.map((s) =>
																										(function $O(e) {
																											const t = e.routeConfig
																												? e.routeConfig
																														.canActivateChild
																												: null;
																											return t && 0 !== t.length
																												? { node: e, guards: t }
																												: null;
																										})(s)
																									)
																									.filter((s) => null !== s)
																									.map((s) =>
																										Ty(() =>
																											O(
																												s.guards.map((u) => {
																													const l =
																															lo(s.node) ?? n,
																														c = Ur(u, l);
																													return Dn(
																														(function GO(e) {
																															return (
																																e &&
																																ho(
																																	e.canActivateChild
																																)
																															);
																														})(c)
																															? c.canActivateChild(
																																	r,
																																	e
																															  )
																															: l.runInContext(
																																	() => c(r, e)
																															  )
																													).pipe(_n());
																												})
																											).pipe(Br())
																										)
																									);
																							return O(o).pipe(Br());
																						})(e, i.path, n),
																						(function tA(e, t, n) {
																							const r = t.routeConfig
																								? t.routeConfig.canActivate
																								: null;
																							if (!r || 0 === r.length)
																								return O(!0);
																							const i = r.map((o) =>
																								Ty(() => {
																									const s = lo(t) ?? n,
																										a = Ur(o, s);
																									return Dn(
																										(function qO(e) {
																											return (
																												e && ho(e.canActivate)
																											);
																										})(a)
																											? a.canActivate(t, e)
																											: s.runInContext(() =>
																													a(t, e)
																											  )
																									).pipe(_n());
																								})
																							);
																							return O(i).pipe(Br());
																						})(e, i.route, n)
																					)
																				),
																				_n((i) => !0 !== i, !0)
																			);
																	  })(r, o, e, t)
																	: O(a)
															),
															W((a) => ({ ...n, guardsResult: a }))
													  );
											});
										})(this.environmentInjector, (s) => this.events.next(s)),
										je((s) => {
											if (
												((r.guardsResult = s.guardsResult), zn(s.guardsResult))
											)
												throw o_(0, s.guardsResult);
											const a = new pO(
												s.id,
												this.urlSerializer.serialize(s.extractedUrl),
												this.urlSerializer.serialize(s.urlAfterRedirects),
												s.targetSnapshot,
												!!s.guardsResult
											);
											this.events.next(a);
										}),
										yn(
											(s) =>
												!!s.guardsResult ||
												(n.restoreHistory(s),
												this.cancelNavigationTransition(s, "", 3, n),
												!1)
										),
										sd((s) => {
											if (s.guards.canActivateChecks.length)
												return O(s).pipe(
													je((a) => {
														const u = new gO(
															a.id,
															this.urlSerializer.serialize(a.extractedUrl),
															this.urlSerializer.serialize(a.urlAfterRedirects),
															a.targetSnapshot
														);
														this.events.next(u);
													}),
													Vt((a) => {
														let u = !1;
														return O(a).pipe(
															(function MA(e, t) {
																return Pe((n) => {
																	const {
																		targetSnapshot: r,
																		guards: { canActivateChecks: i },
																	} = n;
																	if (!i.length) return O(n);
																	let o = 0;
																	return De(i).pipe(
																		Un((s) =>
																			(function EA(e, t, n, r) {
																				const i = e.routeConfig,
																					o = e._resolve;
																				return (
																					void 0 !== i?.title &&
																						!M_(i) &&
																						(o[eo] = i.title),
																					(function IA(e, t, n, r) {
																						const i = (function SA(e) {
																							return [
																								...Object.keys(e),
																								...Object.getOwnPropertySymbols(
																									e
																								),
																							];
																						})(e);
																						if (0 === i.length) return O({});
																						const o = {};
																						return De(i).pipe(
																							Pe((s) =>
																								(function PA(e, t, n, r) {
																									const i = lo(t) ?? r,
																										o = Ur(e, i);
																									return Dn(
																										o.resolve
																											? o.resolve(t, n)
																											: i.runInContext(() =>
																													o(t, n)
																											  )
																									);
																								})(e[s], t, n, r).pipe(
																									_n(),
																									je((a) => {
																										o[s] = a;
																									})
																								)
																							),
																							jc(1),
																							(function j1(e) {
																								return W(() => e);
																							})(o),
																							Cn((s) => (rd(s) ? Ht : Xi(s)))
																						);
																					})(o, e, t, r).pipe(
																						W(
																							(s) => (
																								(e._resolvedData = s),
																								(e.data = n_(e, n).resolve),
																								i &&
																									M_(i) &&
																									(e.data[eo] = i.title),
																								null
																							)
																						)
																					)
																				);
																			})(s.route, r, e, t)
																		),
																		je(() => o++),
																		jc(1),
																		Pe((s) => (o === i.length ? O(n) : Ht))
																	);
																});
															})(
																n.paramsInheritanceStrategy,
																this.environmentInjector
															),
															je({
																next: () => (u = !0),
																complete: () => {
																	u ||
																		(n.restoreHistory(a),
																		this.cancelNavigationTransition(
																			a,
																			"",
																			2,
																			n
																		));
																},
															})
														);
													}),
													je((a) => {
														const u = new mO(
															a.id,
															this.urlSerializer.serialize(a.extractedUrl),
															this.urlSerializer.serialize(a.urlAfterRedirects),
															a.targetSnapshot
														);
														this.events.next(u);
													})
												);
										}),
										sd((s) => {
											const a = (u) => {
												const l = [];
												u.routeConfig?.loadComponent &&
													!u.routeConfig._loadedComponent &&
													l.push(
														this.configLoader.loadComponent(u.routeConfig).pipe(
															je((c) => {
																u.component = c;
															}),
															W(() => {})
														)
													);
												for (const c of u.children) l.push(...a(c));
												return l;
											};
											return Sy(a(s.targetSnapshot.root)).pipe(ua(), Ji(1));
										}),
										sd(() => n.afterPreactivation()),
										W((s) => {
											const a = (function PO(e, t, n) {
												const r = ao(e, t._root, n ? n._root : void 0);
												return new e_(r, t);
											})(
												n.routeReuseStrategy,
												s.targetSnapshot,
												s.currentRouterState
											);
											return (r = { ...s, targetRouterState: a });
										}),
										je((s) => {
											(n.currentUrlTree = s.urlAfterRedirects),
												(n.rawUrlTree = n.urlHandlingStrategy.merge(
													s.urlAfterRedirects,
													s.rawUrl
												)),
												(n.routerState = s.targetRouterState),
												"deferred" === n.urlUpdateStrategy &&
													(s.extras.skipLocationChange ||
														n.setBrowserUrl(n.rawUrlTree, s),
													(n.browserUrlTree = s.urlAfterRedirects));
										}),
										((e, t, n) =>
											W(
												(r) => (
													new jO(
														t,
														r.targetRouterState,
														r.currentRouterState,
														n
													).activate(e),
													r
												)
											))(this.rootContexts, n.routeReuseStrategy, (s) =>
											this.events.next(s)
										),
										je({
											next: (s) => {
												(i = !0),
													(this.lastSuccessfulNavigation =
														this.currentNavigation),
													(n.navigated = !0),
													this.events.next(
														new qn(
															s.id,
															this.urlSerializer.serialize(s.extractedUrl),
															this.urlSerializer.serialize(n.currentUrlTree)
														)
													),
													n.titleStrategy?.updateTitle(
														s.targetRouterState.snapshot
													),
													s.resolve(!0);
											},
											complete: () => {
												i = !0;
											},
										}),
										Vc(() => {
											i || o || this.cancelNavigationTransition(r, "", 1, n),
												this.currentNavigation?.id === r.id &&
													(this.currentNavigation = null);
										}),
										Cn((s) => {
											if (((o = !0), u_(s))) {
												a_(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
												const a = new ma(
													r.id,
													this.urlSerializer.serialize(r.extractedUrl),
													s.message,
													s.cancellationCode
												);
												if ((this.events.next(a), a_(s))) {
													const u = n.urlHandlingStrategy.merge(
															s.url,
															n.rawUrlTree
														),
														l = {
															skipLocationChange: r.extras.skipLocationChange,
															replaceUrl:
																"eager" === n.urlUpdateStrategy || P_(r.source),
														};
													n.scheduleNavigation(u, "imperative", null, l, {
														resolve: r.resolve,
														reject: r.reject,
														promise: r.promise,
													});
												} else r.resolve(!1);
											} else {
												n.restoreHistory(r, !0);
												const a = new Yy(
													r.id,
													this.urlSerializer.serialize(r.extractedUrl),
													s,
													r.targetSnapshot ?? void 0
												);
												this.events.next(a);
												try {
													r.resolve(n.errorHandler(s));
												} catch (u) {
													r.reject(u);
												}
											}
											return Ht;
										})
									);
								})
							)
						);
					}
					cancelNavigationTransition(n, r, i, o) {
						const s = new ma(
							n.id,
							this.urlSerializer.serialize(n.extractedUrl),
							r,
							i
						);
						this.events.next(s), n.resolve(!1);
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)();
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
					e
				);
			})();
			function P_(e) {
				return "imperative" !== e;
			}
			let T_ = (() => {
					class e {
						buildTitle(n) {
							let r,
								i = n.root;
							for (; void 0 !== i; )
								(r = this.getResolvedTitleForRoute(i) ?? r),
									(i = i.children.find((o) => o.outlet === z));
							return r;
						}
						getResolvedTitleForRoute(n) {
							return n.data[eo];
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)();
						}),
						(e.ɵprov = k({
							token: e,
							factory: function () {
								return Q(AA);
							},
							providedIn: "root",
						})),
						e
					);
				})(),
				AA = (() => {
					class e extends T_ {
						constructor(n) {
							super(), (this.title = n);
						}
						updateTitle(n) {
							const r = this.buildTitle(n);
							void 0 !== r && this.title.setTitle(r);
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(S(My));
						}),
						(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
						e
					);
				})(),
				xA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)();
						}),
						(e.ɵprov = k({
							token: e,
							factory: function () {
								return Q(NA);
							},
							providedIn: "root",
						})),
						e
					);
				})();
			class RA {
				shouldDetach(t) {
					return !1;
				}
				store(t, n) {}
				shouldAttach(t) {
					return !1;
				}
				retrieve(t) {
					return null;
				}
				shouldReuseRoute(t, n) {
					return t.routeConfig === n.routeConfig;
				}
			}
			let NA = (() => {
				class e extends RA {}
				return (
					(e.ɵfac = (function () {
						let t;
						return function (r) {
							return (
								t ||
								(t = (function Lf(e) {
									return cn(() => {
										const t = e.prototype.constructor,
											n = t[qt] || du(t),
											r = Object.prototype;
										let i = Object.getPrototypeOf(e.prototype).constructor;
										for (; i && i !== r; ) {
											const o = i[qt] || du(i);
											if (o && o !== n) return o;
											i = Object.getPrototypeOf(i);
										}
										return (o) => new o();
									});
								})(e))
							)(r || e);
						};
					})()),
					(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
					e
				);
			})();
			const Ea = new F("", { providedIn: "root", factory: () => ({}) });
			let kA = (() => {
					class e {}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)();
						}),
						(e.ɵprov = k({
							token: e,
							factory: function () {
								return Q(LA);
							},
							providedIn: "root",
						})),
						e
					);
				})(),
				LA = (() => {
					class e {
						shouldProcessUrl(n) {
							return !0;
						}
						extract(n) {
							return n;
						}
						merge(n, r) {
							return n;
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)();
						}),
						(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
						e
					);
				})();
			function jA(e) {
				throw e;
			}
			function VA(e, t, n) {
				return t.parse("/");
			}
			const $A = {
					paths: "exact",
					fragment: "ignored",
					matrixParams: "ignored",
					queryParams: "exact",
				},
				UA = {
					paths: "subset",
					fragment: "ignored",
					matrixParams: "ignored",
					queryParams: "subset",
				};
			let Xe = (() => {
					class e {
						constructor() {
							(this.disposed = !1),
								(this.currentPageId = 0),
								(this.console = Q(oS)),
								(this.isNgZoneEnabled = !1),
								(this.options = Q(Ea, { optional: !0 }) || {}),
								(this.errorHandler = this.options.errorHandler || jA),
								(this.malformedUriErrorHandler =
									this.options.malformedUriErrorHandler || VA),
								(this.navigated = !1),
								(this.lastSuccessfulId = -1),
								(this.afterPreactivation = () => O(void 0)),
								(this.urlHandlingStrategy = Q(kA)),
								(this.routeReuseStrategy = Q(xA)),
								(this.urlCreationStrategy = Q(EO)),
								(this.titleStrategy = Q(T_)),
								(this.onSameUrlNavigation =
									this.options.onSameUrlNavigation || "ignore"),
								(this.paramsInheritanceStrategy =
									this.options.paramsInheritanceStrategy || "emptyOnly"),
								(this.urlUpdateStrategy =
									this.options.urlUpdateStrategy || "deferred"),
								(this.canceledNavigationResolution =
									this.options.canceledNavigationResolution || "replace"),
								(this.config = Fy(Q(Hr, { optional: !0 }) ?? [])),
								(this.navigationTransitions = Q(ud)),
								(this.urlSerializer = Q(no)),
								(this.location = Q(cc)),
								(this.rootComponentType = null),
								(this.isNgZoneEnabled =
									Q(ve) instanceof ve && ve.isInAngularZone()),
								this.resetConfig(this.config),
								(this.currentUrlTree = new Bn()),
								(this.rawUrlTree = this.currentUrlTree),
								(this.browserUrlTree = this.currentUrlTree),
								(this.routerState = t_(
									this.currentUrlTree,
									this.rootComponentType
								)),
								this.navigationTransitions.setupNavigations(this).subscribe(
									(n) => {
										(this.lastSuccessfulId = n.id),
											(this.currentPageId = n.targetPageId);
									},
									(n) => {
										this.console.warn(`Unhandled Navigation Error: ${n}`);
									}
								);
						}
						get navigationId() {
							return this.navigationTransitions.navigationId;
						}
						get browserPageId() {
							return this.location.getState()?.ɵrouterPageId;
						}
						get events() {
							return this.navigationTransitions.events;
						}
						resetRootComponentType(n) {
							(this.rootComponentType = n),
								(this.routerState.root.component = this.rootComponentType);
						}
						initialNavigation() {
							this.setUpLocationChangeListener(),
								this.navigationTransitions.hasRequestedNavigation ||
									this.navigateByUrl(this.location.path(!0), {
										replaceUrl: !0,
									});
						}
						setUpLocationChangeListener() {
							this.locationSubscription ||
								(this.locationSubscription = this.location.subscribe((n) => {
									const r = "popstate" === n.type ? "popstate" : "hashchange";
									"popstate" === r &&
										setTimeout(() => {
											const i = { replaceUrl: !0 },
												o = n.state?.navigationId ? n.state : null;
											if (n.state) {
												const a = { ...n.state };
												delete a.navigationId,
													delete a.ɵrouterPageId,
													0 !== Object.keys(a).length && (i.state = a);
											}
											const s = this.parseUrl(n.url);
											this.scheduleNavigation(s, r, o, i);
										}, 0);
								}));
						}
						get url() {
							return this.serializeUrl(this.currentUrlTree);
						}
						getCurrentNavigation() {
							return this.navigationTransitions.currentNavigation;
						}
						resetConfig(n) {
							(this.config = n.map(nd)),
								(this.navigated = !1),
								(this.lastSuccessfulId = -1);
						}
						ngOnDestroy() {
							this.dispose();
						}
						dispose() {
							this.navigationTransitions.complete(),
								this.locationSubscription &&
									(this.locationSubscription.unsubscribe(),
									(this.locationSubscription = void 0)),
								(this.disposed = !0);
						}
						createUrlTree(n, r = {}) {
							const {
									relativeTo: i,
									queryParams: o,
									fragment: s,
									queryParamsHandling: a,
									preserveFragment: u,
								} = r,
								l = u ? this.currentUrlTree.fragment : s;
							let c = null;
							switch (a) {
								case "merge":
									c = { ...this.currentUrlTree.queryParams, ...o };
									break;
								case "preserve":
									c = this.currentUrlTree.queryParams;
									break;
								default:
									c = o || null;
							}
							return (
								null !== c && (c = this.removeEmptyProps(c)),
								this.urlCreationStrategy.createUrlTree(
									i,
									this.routerState,
									this.currentUrlTree,
									n,
									c,
									l ?? null
								)
							);
						}
						navigateByUrl(n, r = { skipLocationChange: !1 }) {
							const i = zn(n) ? n : this.parseUrl(n),
								o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
							return this.scheduleNavigation(o, "imperative", null, r);
						}
						navigate(n, r = { skipLocationChange: !1 }) {
							return (
								(function BA(e) {
									for (let t = 0; t < e.length; t++) {
										if (null == e[t]) throw new w(4008, !1);
									}
								})(n),
								this.navigateByUrl(this.createUrlTree(n, r), r)
							);
						}
						serializeUrl(n) {
							return this.urlSerializer.serialize(n);
						}
						parseUrl(n) {
							let r;
							try {
								r = this.urlSerializer.parse(n);
							} catch (i) {
								r = this.malformedUriErrorHandler(i, this.urlSerializer, n);
							}
							return r;
						}
						isActive(n, r) {
							let i;
							if (
								((i = !0 === r ? { ...$A } : !1 === r ? { ...UA } : r), zn(n))
							)
								return jy(this.currentUrlTree, n, i);
							const o = this.parseUrl(n);
							return jy(this.currentUrlTree, o, i);
						}
						removeEmptyProps(n) {
							return Object.keys(n).reduce((r, i) => {
								const o = n[i];
								return null != o && (r[i] = o), r;
							}, {});
						}
						scheduleNavigation(n, r, i, o, s) {
							if (this.disposed) return Promise.resolve(!1);
							let a, u, l, c;
							return (
								s
									? ((a = s.resolve), (u = s.reject), (l = s.promise))
									: (l = new Promise((d, f) => {
											(a = d), (u = f);
									  })),
								"computed" === this.canceledNavigationResolution
									? (0 === this.currentPageId && (i = this.location.getState()),
									  (c =
											i && i.ɵrouterPageId
												? i.ɵrouterPageId
												: o.replaceUrl || o.skipLocationChange
												? this.browserPageId ?? 0
												: (this.browserPageId ?? 0) + 1))
									: (c = 0),
								this.navigationTransitions.handleNavigationRequest({
									targetPageId: c,
									source: r,
									restoredState: i,
									currentUrlTree: this.currentUrlTree,
									currentRawUrl: this.currentUrlTree,
									rawUrl: n,
									extras: o,
									resolve: a,
									reject: u,
									promise: l,
									currentSnapshot: this.routerState.snapshot,
									currentRouterState: this.routerState,
								}),
								l.catch((d) => Promise.reject(d))
							);
						}
						setBrowserUrl(n, r) {
							const i = this.urlSerializer.serialize(n),
								o = {
									...r.extras.state,
									...this.generateNgRouterState(r.id, r.targetPageId),
								};
							this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl
								? this.location.replaceState(i, "", o)
								: this.location.go(i, "", o);
						}
						restoreHistory(n, r = !1) {
							if ("computed" === this.canceledNavigationResolution) {
								const i = this.currentPageId - n.targetPageId;
								("popstate" !== n.source &&
									"eager" !== this.urlUpdateStrategy &&
									this.currentUrlTree !==
										this.getCurrentNavigation()?.finalUrl) ||
								0 === i
									? this.currentUrlTree ===
											this.getCurrentNavigation()?.finalUrl &&
									  0 === i &&
									  (this.resetState(n),
									  (this.browserUrlTree = n.currentUrlTree),
									  this.resetUrlToCurrentUrlTree())
									: this.location.historyGo(i);
							} else
								"replace" === this.canceledNavigationResolution &&
									(r && this.resetState(n), this.resetUrlToCurrentUrlTree());
						}
						resetState(n) {
							(this.routerState = n.currentRouterState),
								(this.currentUrlTree = n.currentUrlTree),
								(this.rawUrlTree = this.urlHandlingStrategy.merge(
									this.currentUrlTree,
									n.rawUrl
								));
						}
						resetUrlToCurrentUrlTree() {
							this.location.replaceState(
								this.urlSerializer.serialize(this.rawUrlTree),
								"",
								this.generateNgRouterState(
									this.lastSuccessfulId,
									this.currentPageId
								)
							);
						}
						generateNgRouterState(n, r) {
							return "computed" === this.canceledNavigationResolution
								? { navigationId: n, ɵrouterPageId: r }
								: { navigationId: n };
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)();
						}),
						(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
						e
					);
				})(),
				Wn = (() => {
					class e {
						constructor(n, r, i, o, s, a) {
							(this.router = n),
								(this.route = r),
								(this.tabIndexAttribute = i),
								(this.renderer = o),
								(this.el = s),
								(this.locationStrategy = a),
								(this._preserveFragment = !1),
								(this._skipLocationChange = !1),
								(this._replaceUrl = !1),
								(this.href = null),
								(this.commands = null),
								(this.onChanges = new Ut());
							const u = s.nativeElement.tagName;
							(this.isAnchorElement = "A" === u || "AREA" === u),
								this.isAnchorElement
									? (this.subscription = n.events.subscribe((l) => {
											l instanceof qn && this.updateHref();
									  }))
									: this.setTabIndexIfNotOnNativeEl("0");
						}
						set preserveFragment(n) {
							this._preserveFragment = sc(n);
						}
						get preserveFragment() {
							return this._preserveFragment;
						}
						set skipLocationChange(n) {
							this._skipLocationChange = sc(n);
						}
						get skipLocationChange() {
							return this._skipLocationChange;
						}
						set replaceUrl(n) {
							this._replaceUrl = sc(n);
						}
						get replaceUrl() {
							return this._replaceUrl;
						}
						setTabIndexIfNotOnNativeEl(n) {
							null != this.tabIndexAttribute ||
								this.isAnchorElement ||
								this.applyAttributeValue("tabindex", n);
						}
						ngOnChanges(n) {
							this.isAnchorElement && this.updateHref(),
								this.onChanges.next(this);
						}
						set routerLink(n) {
							null != n
								? ((this.commands = Array.isArray(n) ? n : [n]),
								  this.setTabIndexIfNotOnNativeEl("0"))
								: ((this.commands = null),
								  this.setTabIndexIfNotOnNativeEl(null));
						}
						onClick(n, r, i, o, s) {
							return (
								!!(
									null === this.urlTree ||
									(this.isAnchorElement &&
										(0 !== n ||
											r ||
											i ||
											o ||
											s ||
											("string" == typeof this.target &&
												"_self" != this.target)))
								) ||
								(this.router.navigateByUrl(this.urlTree, {
									skipLocationChange: this.skipLocationChange,
									replaceUrl: this.replaceUrl,
									state: this.state,
								}),
								!this.isAnchorElement)
							);
						}
						ngOnDestroy() {
							this.subscription?.unsubscribe();
						}
						updateHref() {
							this.href =
								null !== this.urlTree && this.locationStrategy
									? this.locationStrategy?.prepareExternalUrl(
											this.router.serializeUrl(this.urlTree)
									  )
									: null;
							const n =
								null === this.href
									? null
									: (function Fh(e, t, n) {
											return (function ib(e, t) {
												return ("src" === t &&
													("embed" === e ||
														"frame" === e ||
														"iframe" === e ||
														"media" === e ||
														"script" === e)) ||
													("href" === t && ("base" === e || "link" === e))
													? Nh
													: pr;
											})(
												t,
												n
											)(e);
									  })(
											this.href,
											this.el.nativeElement.tagName.toLowerCase(),
											"href"
									  );
							this.applyAttributeValue("href", n);
						}
						applyAttributeValue(n, r) {
							const i = this.renderer,
								o = this.el.nativeElement;
							null !== r ? i.setAttribute(o, n, r) : i.removeAttribute(o, n);
						}
						get urlTree() {
							return null === this.commands
								? null
								: this.router.createUrlTree(this.commands, {
										relativeTo:
											void 0 !== this.relativeTo ? this.relativeTo : this.route,
										queryParams: this.queryParams,
										fragment: this.fragment,
										queryParamsHandling: this.queryParamsHandling,
										preserveFragment: this.preserveFragment,
								  });
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(
								P(Xe),
								P(Gn),
								(function rs(e) {
									return (function TD(e, t) {
										if ("class" === t) return e.classes;
										if ("style" === t) return e.styles;
										const n = e.attrs;
										if (n) {
											const r = n.length;
											let i = 0;
											for (; i < r; ) {
												const o = n[i];
												if (Mf(o)) break;
												if (0 === o) i += 2;
												else if ("number" == typeof o)
													for (i++; i < r && "string" == typeof n[i]; ) i++;
												else {
													if (o === t) return n[i + 1];
													i += 2;
												}
											}
										}
										return null;
									})(Oe(), e);
								})("tabindex"),
								P(vs),
								P(hn),
								P($n)
							);
						}),
						(e.ɵdir = Ve({
							type: e,
							selectors: [["", "routerLink", ""]],
							hostVars: 1,
							hostBindings: function (n, r) {
								1 & n &&
									Fi("click", function (o) {
										return r.onClick(
											o.button,
											o.ctrlKey,
											o.shiftKey,
											o.altKey,
											o.metaKey
										);
									}),
									2 & n && vl("target", r.target);
							},
							inputs: {
								target: "target",
								queryParams: "queryParams",
								fragment: "fragment",
								queryParamsHandling: "queryParamsHandling",
								state: "state",
								relativeTo: "relativeTo",
								preserveFragment: "preserveFragment",
								skipLocationChange: "skipLocationChange",
								replaceUrl: "replaceUrl",
								routerLink: "routerLink",
							},
							standalone: !0,
							features: [Pn],
						})),
						e
					);
				})(),
				A_ = (() => {
					class e {
						constructor(n, r, i, o, s) {
							(this.router = n),
								(this.element = r),
								(this.renderer = i),
								(this.cdr = o),
								(this.link = s),
								(this.classes = []),
								(this.isActive = !1),
								(this.routerLinkActiveOptions = { exact: !1 }),
								(this.isActiveChange = new qe()),
								(this.routerEventsSubscription = n.events.subscribe((a) => {
									a instanceof qn && this.update();
								}));
						}
						ngAfterContentInit() {
							O(this.links.changes, O(null))
								.pipe(Kn())
								.subscribe((n) => {
									this.update(), this.subscribeToEachLinkOnChanges();
								});
						}
						subscribeToEachLinkOnChanges() {
							this.linkInputChangesSubscription?.unsubscribe();
							const n = [...this.links.toArray(), this.link]
								.filter((r) => !!r)
								.map((r) => r.onChanges);
							this.linkInputChangesSubscription = De(n)
								.pipe(Kn())
								.subscribe((r) => {
									this.isActive !== this.isLinkActive(this.router)(r) &&
										this.update();
								});
						}
						set routerLinkActive(n) {
							const r = Array.isArray(n) ? n : n.split(" ");
							this.classes = r.filter((i) => !!i);
						}
						ngOnChanges(n) {
							this.update();
						}
						ngOnDestroy() {
							this.routerEventsSubscription.unsubscribe(),
								this.linkInputChangesSubscription?.unsubscribe();
						}
						update() {
							!this.links ||
								!this.router.navigated ||
								Promise.resolve().then(() => {
									const n = this.hasActiveLinks();
									this.isActive !== n &&
										((this.isActive = n),
										this.cdr.markForCheck(),
										this.classes.forEach((r) => {
											n
												? this.renderer.addClass(this.element.nativeElement, r)
												: this.renderer.removeClass(
														this.element.nativeElement,
														r
												  );
										}),
										n && void 0 !== this.ariaCurrentWhenActive
											? this.renderer.setAttribute(
													this.element.nativeElement,
													"aria-current",
													this.ariaCurrentWhenActive.toString()
											  )
											: this.renderer.removeAttribute(
													this.element.nativeElement,
													"aria-current"
											  ),
										this.isActiveChange.emit(n));
								});
						}
						isLinkActive(n) {
							const r = (function HA(e) {
								return !!e.paths;
							})(this.routerLinkActiveOptions)
								? this.routerLinkActiveOptions
								: this.routerLinkActiveOptions.exact || !1;
							return (i) => !!i.urlTree && n.isActive(i.urlTree, r);
						}
						hasActiveLinks() {
							const n = this.isLinkActive(this.router);
							return (this.link && n(this.link)) || this.links.some(n);
						}
					}
					return (
						(e.ɵfac = function (n) {
							return new (n || e)(P(Xe), P(hn), P(vs), P(tc), P(Wn, 8));
						}),
						(e.ɵdir = Ve({
							type: e,
							selectors: [["", "routerLinkActive", ""]],
							contentQueries: function (n, r, i) {
								if ((1 & n && Fm(i, Wn, 5), 2 & n)) {
									let o;
									Nm(
										(o = (function km() {
											return (function LI(e, t) {
												return e[19].queries[t].queryList;
											})(v(), vf());
										})())
									) && (r.links = o);
								}
							},
							inputs: {
								routerLinkActiveOptions: "routerLinkActiveOptions",
								ariaCurrentWhenActive: "ariaCurrentWhenActive",
								routerLinkActive: "routerLinkActive",
							},
							outputs: { isActiveChange: "isActiveChange" },
							exportAs: ["routerLinkActive"],
							standalone: !0,
							features: [Pn],
						})),
						e
					);
				})();
			class x_ {}
			let zA = (() => {
				class e {
					constructor(n, r, i, o, s) {
						(this.router = n),
							(this.injector = i),
							(this.preloadingStrategy = o),
							(this.loader = s);
					}
					setUpPreloading() {
						this.subscription = this.router.events
							.pipe(
								yn((n) => n instanceof qn),
								Un(() => this.preload())
							)
							.subscribe(() => {});
					}
					preload() {
						return this.processRoutes(this.injector, this.router.config);
					}
					ngOnDestroy() {
						this.subscription && this.subscription.unsubscribe();
					}
					processRoutes(n, r) {
						const i = [];
						for (const o of r) {
							o.providers &&
								!o._injector &&
								(o._injector = Fs(o.providers, n, `Route: ${o.path}`));
							const s = o._injector ?? n,
								a = o._loadedInjector ?? s;
							(o.loadChildren && !o._loadedRoutes && void 0 === o.canLoad) ||
							(o.loadComponent && !o._loadedComponent)
								? i.push(this.preloadConfig(s, o))
								: (o.children || o._loadedRoutes) &&
								  i.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
						}
						return De(i).pipe(Kn());
					}
					preloadConfig(n, r) {
						return this.preloadingStrategy.preload(r, () => {
							let i;
							i =
								r.loadChildren && void 0 === r.canLoad
									? this.loader.loadChildren(n, r)
									: O(null);
							const o = i.pipe(
								Pe((s) =>
									null === s
										? O(void 0)
										: ((r._loadedRoutes = s.routes),
										  (r._loadedInjector = s.injector),
										  this.processRoutes(s.injector ?? n, s.routes))
								)
							);
							return r.loadComponent && !r._loadedComponent
								? De([o, this.loader.loadComponent(r)]).pipe(Kn())
								: o;
						});
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(S(Xe), S(uv), S(Yt), S(x_), S(ad));
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
					e
				);
			})();
			const ld = new F("");
			let R_ = (() => {
				class e {
					constructor(n, r, i, o, s = {}) {
						(this.urlSerializer = n),
							(this.transitions = r),
							(this.viewportScroller = i),
							(this.zone = o),
							(this.options = s),
							(this.lastId = 0),
							(this.lastSource = "imperative"),
							(this.restoredId = 0),
							(this.store = {}),
							(s.scrollPositionRestoration =
								s.scrollPositionRestoration || "disabled"),
							(s.anchorScrolling = s.anchorScrolling || "disabled");
					}
					init() {
						"disabled" !== this.options.scrollPositionRestoration &&
							this.viewportScroller.setHistoryScrollRestoration("manual"),
							(this.routerEventsSubscription = this.createScrollEvents()),
							(this.scrollEventsSubscription = this.consumeScrollEvents());
					}
					createScrollEvents() {
						return this.transitions.events.subscribe((n) => {
							n instanceof Gc
								? ((this.store[this.lastId] =
										this.viewportScroller.getScrollPosition()),
								  (this.lastSource = n.navigationTrigger),
								  (this.restoredId = n.restoredState
										? n.restoredState.navigationId
										: 0))
								: n instanceof qn &&
								  ((this.lastId = n.id),
								  this.scheduleScrollEvent(
										n,
										this.urlSerializer.parse(n.urlAfterRedirects).fragment
								  ));
						});
					}
					consumeScrollEvents() {
						return this.transitions.events.subscribe((n) => {
							n instanceof Xy &&
								(n.position
									? "top" === this.options.scrollPositionRestoration
										? this.viewportScroller.scrollToPosition([0, 0])
										: "enabled" === this.options.scrollPositionRestoration &&
										  this.viewportScroller.scrollToPosition(n.position)
									: n.anchor && "enabled" === this.options.anchorScrolling
									? this.viewportScroller.scrollToAnchor(n.anchor)
									: "disabled" !== this.options.scrollPositionRestoration &&
									  this.viewportScroller.scrollToPosition([0, 0]));
						});
					}
					scheduleScrollEvent(n, r) {
						this.zone.runOutsideAngular(() => {
							setTimeout(() => {
								this.zone.run(() => {
									this.transitions.events.next(
										new Xy(
											n,
											"popstate" === this.lastSource
												? this.store[this.restoredId]
												: null,
											r
										)
									);
								});
							}, 0);
						});
					}
					ngOnDestroy() {
						this.routerEventsSubscription?.unsubscribe(),
							this.scrollEventsSubscription?.unsubscribe();
					}
				}
				return (
					(e.ɵfac = function (n) {
						!(function fp() {
							throw new Error("invalid");
						})();
					}),
					(e.ɵprov = k({ token: e, factory: e.ɵfac })),
					e
				);
			})();
			function qr(e, t) {
				return { ɵkind: e, ɵproviders: t };
			}
			function F_() {
				const e = Q(Nt);
				return (t) => {
					const n = e.get(Hs);
					if (t !== n.components[0]) return;
					const r = e.get(Xe),
						i = e.get(k_);
					1 === e.get(dd) && r.initialNavigation(),
						e.get(L_, null, x.Optional)?.setUpPreloading(),
						e.get(ld, null, x.Optional)?.init(),
						r.resetRootComponentType(n.componentTypes[0]),
						i.closed || (i.next(), i.unsubscribe());
				};
			}
			const k_ = new F("", { factory: () => new Ut() }),
				dd = new F("", { providedIn: "root", factory: () => 1 });
			const L_ = new F("");
			function ZA(e) {
				return qr(0, [
					{ provide: L_, useExisting: zA },
					{ provide: x_, useExisting: e },
				]);
			}
			const j_ = new F("ROUTER_FORROOT_GUARD"),
				KA = [
					cc,
					{ provide: no, useClass: $c },
					Xe,
					uo,
					{
						provide: Gn,
						useFactory: function N_(e) {
							return e.routerState.root;
						},
						deps: [Xe],
					},
					ad,
					[],
				];
			function YA() {
				return new gv("Router", Xe);
			}
			let Ia = (() => {
				class e {
					constructor(n) {}
					static forRoot(n, r) {
						return {
							ngModule: e,
							providers: [
								KA,
								[],
								{ provide: Hr, multi: !0, useValue: n },
								{
									provide: j_,
									useFactory: tx,
									deps: [[Xe, new yi(), new _i()]],
								},
								{ provide: Ea, useValue: r || {} },
								r?.useHash
									? { provide: $n, useClass: GS }
									: { provide: $n, useClass: jv },
								{
									provide: ld,
									useFactory: () => {
										const e = Q(pT),
											t = Q(ve),
											n = Q(Ea),
											r = Q(ud),
											i = Q(no);
										return (
											n.scrollOffset && e.setOffset(n.scrollOffset),
											new R_(i, r, e, t, n)
										);
									},
								},
								r?.preloadingStrategy
									? ZA(r.preloadingStrategy).ɵproviders
									: [],
								{ provide: gv, multi: !0, useFactory: YA },
								r?.initialNavigation ? nx(r) : [],
								[
									{ provide: V_, useFactory: F_ },
									{ provide: av, multi: !0, useExisting: V_ },
								],
							],
						};
					}
					static forChild(n) {
						return {
							ngModule: e,
							providers: [{ provide: Hr, multi: !0, useValue: n }],
						};
					}
				}
				return (
					(e.ɵfac = function (n) {
						return new (n || e)(S(j_, 8));
					}),
					(e.ɵmod = Gt({ type: e })),
					(e.ɵinj = Tt({ imports: [ed] })),
					e
				);
			})();
			function tx(e) {
				return "guarded";
			}
			function nx(e) {
				return [
					"disabled" === e.initialNavigation
						? qr(3, [
								{
									provide: $s,
									multi: !0,
									useFactory: () => {
										const t = Q(Xe);
										return () => {
											t.setUpLocationChangeListener();
										};
									},
								},
								{ provide: dd, useValue: 2 },
						  ]).ɵproviders
						: [],
					"enabledBlocking" === e.initialNavigation
						? qr(2, [
								{ provide: dd, useValue: 0 },
								{
									provide: $s,
									multi: !0,
									deps: [Nt],
									useFactory: (t) => {
										const n = t.get(zS, Promise.resolve());
										return () =>
											n.then(
												() =>
													new Promise((i) => {
														const o = t.get(Xe),
															s = t.get(k_);
														(function r(i) {
															t.get(Xe)
																.events.pipe(
																	yn(
																		(s) =>
																			s instanceof qn ||
																			s instanceof ma ||
																			s instanceof Yy
																	),
																	W(
																		(s) =>
																			s instanceof qn ||
																			(s instanceof ma &&
																				(0 === s.code || 1 === s.code) &&
																				null)
																	),
																	yn((s) => null !== s),
																	Ji(1)
																)
																.subscribe(() => {
																	i();
																});
														})(() => {
															i(!0);
														}),
															(o.afterPreactivation = () => (
																i(!0), s.closed ? O(void 0) : s
															)),
															o.initialNavigation();
													})
											);
									},
								},
						  ]).ɵproviders
						: [],
				];
			}
			const V_ = new F(""),
				ix = function () {
					return { exact: !0 };
				};
			class Gr {
				toggleButton() {
					const t = document.getElementById("items-menu"),
						n = document.getElementById("btn-menu");
					t?.classList.toggle("active"), n?.classList.toggle("active");
				}
				clickedOutside() {
					document.getElementById("items-menu")?.classList.remove("active"),
						document.getElementById("btn-menu")?.classList.remove("active");
				}
				ngOnInit() {
					document
						.getElementById("items-menu")
						?.addEventListener("click", (n) => {
							"disabled" !== n.target.className &&
								(document
									.getElementById("items-menu")
									?.classList.remove("active"),
								document
									.getElementById("btn-menu")
									?.classList.remove("active"));
						});
				}
			}
			(Gr.ɵfac = function (t) {
				return new (t || Gr)();
			}),
				(Gr.ɵcmp = ue({
					type: Gr,
					selectors: [["app-items-menu"]],
					decls: 16,
					vars: 2,
					consts: [
						[1, "container__items-menu"],
						[
							"id",
							"btn-menu",
							"appClickedOutside",
							"",
							3,
							"click",
							"clickedOutside",
						],
						["id", "items-menu"],
						[
							"routerLink",
							"/",
							"routerLinkActive",
							"selected",
							3,
							"routerLinkActiveOptions",
						],
						["routerLink", "/games", "routerLinkActive", "selected"],
						[1, "disabled"],
					],
					template: function (t, n) {
						1 & t &&
							(C(0, "div", 0)(1, "button", 1),
							Fi("click", function () {
								return n.toggleButton();
							})("clickedOutside", function () {
								return n.clickedOutside();
							}),
							$(2, "span"),
							D(),
							C(3, "ul", 2)(4, "li")(5, "a", 3),
							I(6, "Home"),
							D()(),
							C(7, "li")(8, "a", 4),
							I(9, "Games"),
							D()(),
							C(10, "li")(11, "a", 5),
							I(12, "Blog"),
							D()(),
							C(13, "li")(14, "a", 5),
							I(15, "Contact"),
							D()()()()),
							2 & t &&
								(K(5),
								Ae(
									"routerLinkActiveOptions",
									(function bm(e, t, n) {
										const r = Be() + e,
											i = v();
										return i[r] === V
											? kt(i, r, n ? t.call(n) : t())
											: (function Ri(e, t) {
													return e[t];
											  })(i, r);
									})(1, ix)
								));
					},
					dependencies: [Wn, A_],
					styles: [
						'.container__items-menu[_ngcontent-%COMP%]{position:relative}#items-menu[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-evenly;gap:1rem;width:100%}#items-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]{position:relative;padding:1rem 2rem 1rem 0;font-weight:500}#items-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:before{content:"";position:absolute;top:1.1rem;right:.7rem;padding:5px;box-shadow:2px -2px 0 1px #838383 inset;border:solid transparent;border-width:0 0 2px 2px;border-radius:4px;transform:rotate(-45deg);transition:transform ease-in .1s}#items-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:hover{color:var(--primary-color)}#items-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:hover:before{transform:rotate(45deg);box-shadow:2px -2px 0 1px #5f0a59 inset;transition:transform ease-in .1s}.selected[_ngcontent-%COMP%]{color:var(--primary-color)}.disabled[_ngcontent-%COMP%]{color:#838383;transition:none!important}.disabled[_ngcontent-%COMP%]:hover{color:#838383!important;transition:none!important}.disabled[_ngcontent-%COMP%]:hover:before{transform:rotate(-45deg)!important;transition:none!important;box-shadow:2px -2px 0 1px #838383 inset!important}#btn-menu[_ngcontent-%COMP%]{display:none;align-items:start;justify-content:center;background:none;cursor:pointer;width:1.5rem;height:1.225rem;border:none}#btn-menu[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{display:block;position:relative;width:100%;height:.2rem;background-color:var(--primary-color);border-radius:5px;transition:.5s}#btn-menu[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]:after, #btn-menu[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]:before{content:"";display:block;position:relative;width:100%;height:.2rem;border-radius:5px;background-color:var(--primary-color);transition:.5s}#btn-menu[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]:after{margin-top:5px}#btn-menu[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]:before{margin-top:calc(5px + .2rem)}#btn-menu[_ngcontent-%COMP%]:hover > span[_ngcontent-%COMP%]{background-color:#5f0a59}#btn-menu[_ngcontent-%COMP%]:hover > span[_ngcontent-%COMP%]:after, #btn-menu[_ngcontent-%COMP%]:hover > span[_ngcontent-%COMP%]:before{background-color:#5f0a59}@media screen and (max-width: 740px){#btn-menu[_ngcontent-%COMP%]{display:flex}#items-menu[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:absolute;left:-3rem;top:65px;height:0;padding-left:2rem;min-width:285px;width:calc(100vw - 4rem);background-color:#081624;box-shadow:var(--purple-shadow);visibility:hidden;overflow-y:hidden;transition:.6s;transition-property:visibility,overflow-y,height,top;transition-duration:.6s;z-index:1000}#items-menu.active[_ngcontent-%COMP%]{visibility:visible;overflow-y:auto;height:250px;top:70px}#btn-menu.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background-color:transparent}#btn-menu.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before{transform:rotate(135deg)}#btn-menu.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after{transform:rotate(-135deg);top:-7.5px}}',
					],
				}));
			class Qn {}
			(Qn.ɵfac = function (t) {
				return new (t || Qn)();
			}),
				(Qn.ɵcmp = ue({
					type: Qn,
					selectors: [["app-social-media"]],
					decls: 16,
					vars: 0,
					consts: [
						["href", "#"],
						["src", "./assets/social/pinterest.png", "alt", ""],
						["src", "./assets/social/facebook.png", "alt", ""],
						["src", "./assets/social/twitter.png", "alt", ""],
						["src", "./assets/social/youtube.png", "alt", ""],
						["src", "./assets/social/instagram.png", "alt", ""],
					],
					template: function (t, n) {
						1 & t &&
							(C(0, "ul")(1, "li")(2, "a", 0),
							$(3, "img", 1),
							D()(),
							C(4, "li")(5, "a", 0),
							$(6, "img", 2),
							D()(),
							C(7, "li")(8, "a", 0),
							$(9, "img", 3),
							D()(),
							C(10, "li")(11, "a", 0),
							$(12, "img", 4),
							D()(),
							C(13, "li")(14, "a", 0),
							$(15, "img", 5),
							D()()());
					},
					styles: [
						"ul[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:row;flex-wrap:nowrap}ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:flex;align-items:center;padding:.5rem;margin:0 .5rem;border-radius:50%;transition:background-color .2s ease-in-out}ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:var(--primary-color);transition:background-color .2s ease-in-out}ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:.8rem}",
					],
				}));
			class Wr {}
			(Wr.ɵfac = function (t) {
				return new (t || Wr)();
			}),
				(Wr.ɵcmp = ue({
					type: Wr,
					selectors: [["app-menu"]],
					decls: 9,
					vars: 0,
					consts: [
						[1, "container__menu"],
						[1, "social-media"],
						[1, "menu-bar"],
						["routerLink", ""],
						["src", "./assets/logo.webp", "alt", "End Game Logo"],
					],
					template: function (t, n) {
						1 & t &&
							(C(0, "div", 0)(1, "div", 1)(2, "span"),
							I(3, "Follow us: "),
							D(),
							$(4, "app-social-media"),
							D(),
							C(5, "div", 2)(6, "a", 3),
							$(7, "img", 4),
							D(),
							$(8, "app-items-menu"),
							D()());
					},
					dependencies: [Wn, Gr, Qn],
					styles: [
						".container__menu[_ngcontent-%COMP%]{max-width:var(--max-width);margin-inline:auto}.social-media[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:end;align-items:center;padding:1.2rem 0}.social-media[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{color:#9190a5;font-weight:500}.menu-bar[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;justify-content:space-between;background-color:#081624;box-shadow:var(--purple-shadow);padding:2rem 5% 2rem 3rem}.menu-bar[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]{display:flex;justify-self:start}.menu-bar[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover{filter:drop-shadow(2px 2px 3px rgba(176,27,165,.5)) brightness(1.1)}@media screen and (max-width: 740px){.menu-bar[_ngcontent-%COMP%]{flex-direction:row-reverse}}@media screen and (max-width: 365px){.social-media[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-size:.85rem;color:#9190a5;font-weight:500}}",
					],
				}));
			class Qr {
				constructor() {
					this.link = "";
				}
			}
			(Qr.ɵfac = function (t) {
				return new (t || Qr)();
			}),
				(Qr.ɵcmp = ue({
					type: Qr,
					selectors: [["app-button"]],
					inputs: { link: "link" },
					decls: 3,
					vars: 1,
					consts: [
						[3, "routerLink"],
						["src", "./assets/double-arrow.webp", "alt", ""],
					],
					template: function (t, n) {
						1 & t && (C(0, "a", 0), I(1, "Read More"), $(2, "img", 1), D()),
							2 & t && Ae("routerLink", n.link);
					},
					dependencies: [Wn],
					styles: [
						"a[_ngcontent-%COMP%]{position:relative;display:inline-block;font-size:.938rem;font-weight:700;font-style:italic;text-transform:uppercase;text-align:center;cursor:pointer;z-index:1}a[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{display:inline-block;position:relative;left:13px;width:auto}",
					],
				}));
			class Zr {}
			(Zr.ɵfac = function (t) {
				return new (t || Zr)();
			}),
				(Zr.ɵcmp = ue({
					type: Zr,
					selectors: [["app-simple-card"]],
					decls: 10,
					vars: 0,
					consts: [[1, "container__simple-card"]],
					template: function (t, n) {
						1 & t &&
							(C(0, "div", 0)(1, "h3"),
							I(2, "11.11.22 / in "),
							C(3, "span"),
							I(4, "Games"),
							D()(),
							C(5, "h2"),
							I(6, "The best online game in out now"),
							D(),
							C(7, "p"),
							I(
								8,
								" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius-mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida... "
							),
							D(),
							$(9, "app-button"),
							D());
					},
					dependencies: [Qr],
					styles: [
						".container__simple-card[_ngcontent-%COMP%]{position:relative;display:flex;flex-direction:column;align-items:normal;justify-content:normal;height:100%;width:100%}.container__simple-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-weight:500;font-size:1.125rem;margin-bottom:20px}.container__simple-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:500;font-size:1.125rem;color:var(--primary-color)}.container__simple-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-weight:500;margin-bottom:1.875rem}.container__simple-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.87rem;font-weight:500;width:100%;height:100px;color:var(--quartenary-color);margin-bottom:2rem}.container__simple-card[_ngcontent-%COMP%]   app-button[_ngcontent-%COMP%]{position:absolute;bottom:0}@media screen and (max-width: 1200px){.container__simple-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.575rem}.container__simple-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1rem}}",
					],
				}));
			class mo {}
			(mo.ɵfac = function (t) {
				return new (t || mo)();
			}),
				(mo.ɵcmp = ue({
					type: mo,
					selectors: [["app-small-card"]],
					decls: 5,
					vars: 0,
					consts: [
						[1, "container__small-card"],
						[1, "photo"],
						[
							"src",
							"https://preview.colorlib.com/theme/endgam/img/games/big.jpg.webp",
							"alt",
							"",
						],
						[1, "content"],
					],
					template: function (t, n) {
						1 & t &&
							(C(0, "div", 0)(1, "div", 1),
							$(2, "img", 2),
							D(),
							C(3, "div", 3),
							$(4, "app-simple-card"),
							D()());
					},
					dependencies: [Zr],
					styles: [
						".container__small-card[_ngcontent-%COMP%]{display:flex;flex-direction:row;gap:1.875rem}.photo[_ngcontent-%COMP%]{max-height:300px}.photo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;width:100%;object-fit:cover}@media screen and (max-width: 750px){.container__small-card[_ngcontent-%COMP%]{flex-direction:column}.photo[_ngcontent-%COMP%]{max-height:min-content;min-height:200px}}",
					],
				}));
			class vo {}
			(vo.ɵfac = function (t) {
				return new (t || vo)();
			}),
				(vo.ɵcmp = ue({
					type: vo,
					selectors: [["app-big-card"]],
					decls: 15,
					vars: 0,
					consts: [
						[1, "container__big-card"],
						[1, "image"],
						[1, "content-container"],
						[1, "content"],
						["href", "#"],
						["src", "./assets/double-arrow.webp", "alt", ""],
					],
					template: function (t, n) {
						1 & t &&
							(C(0, "div", 0),
							$(1, "div", 1),
							C(2, "div", 2)(3, "div", 3)(4, "h3"),
							I(5, "11.11.22 / in "),
							C(6, "span"),
							I(7, "Games"),
							D()(),
							C(8, "h2"),
							I(9, "The best online game in out now"),
							D(),
							C(10, "p"),
							I(
								11,
								" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum posuere porttitor justo id pellentesque. Proin id lacus feugiat, posuere erat sit amet, commodo ipsum. Donec pellentesque vestibulum metus... "
							),
							D(),
							C(12, "a", 4),
							I(13, "Read More"),
							$(14, "img", 5),
							D()()()());
					},
					styles: [
						".container__big-card[_ngcontent-%COMP%]{position:relative;overflow:hidden}.container__big-card[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{background-image:url(https://preview.colorlib.com/theme/endgam/img/featured-bg.jpg.webp);background-repeat:no-repeat;background-size:cover;background-position:top center;position:absolute;float:left;width:calc(50% - 156px);height:100%;left:0;right:0}.container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]{float:right;width:calc(50% + 156px);background:white;padding:6.25rem 3.125rem 8.125rem 5rem}.container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{position:relative;display:flex;max-width:810px;flex-direction:column;align-items:normal;justify-content:normal;height:100%;width:100%}.container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-weight:500;font-size:1.125rem;color:var(--quartenary-color);margin-bottom:20px}.container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:500;font-size:1.125rem;color:var(--primary-color)}.container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-weight:500;font-size:3.75rem;margin-bottom:1.875rem;color:#111}.container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.97rem;font-weight:500;width:100%;text-align:justify;color:var(--quartenary-color);margin-bottom:2.1rem}.container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{position:absolute;bottom:-2rem;color:#251e2f;display:inline-block;font-size:.938rem;font-weight:700;font-style:italic;text-transform:uppercase;text-align:center;cursor:pointer;z-index:1}.container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{display:inline-block;position:relative;left:13px;width:auto}@media screen and (max-width: 1000px){.container__big-card[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{display:none}.container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]{float:none;width:100%;padding:6.25rem 3.125rem 5rem}}@media screen and (max-width: 750px){.container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:1rem}.container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:3rem}.container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.87rem}}@media screen and (max-width: 520px){.container__big-card[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.8rem}}",
					],
				}));
			class Kr {
				constructor() {
					this.label = "";
				}
			}
			(Kr.ɵfac = function (t) {
				return new (t || Kr)();
			}),
				(Kr.ɵcmp = ue({
					type: Kr,
					selectors: [["app-stylized-button"]],
					inputs: { label: "label" },
					decls: 4,
					vars: 1,
					consts: [
						[1, "container__stylized-button"],
						["href", "#"],
						["src", "./assets/double-arrow.webp", "alt", ""],
					],
					template: function (t, n) {
						1 & t && (C(0, "div", 0)(1, "a", 1), I(2), $(3, "img", 2), D()()),
							2 & t && (K(2), en(n.label));
					},
					styles: [
						'.container__stylized-button[_ngcontent-%COMP%]{position:relative;height:100px;opacity:0;animation:slide-top .5s .8s cubic-bezier(.25,.46,.45,.94) both}a[_ngcontent-%COMP%]{position:relative;display:inline-block;font-weight:700;font-style:italic;padding:24px 30px;text-transform:uppercase;min-width:186px;color:#081624;text-align:center;cursor:pointer;background-color:#fff;z-index:1}a[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{display:inline-block;position:relative;left:13px;width:auto}a[_ngcontent-%COMP%]:after, a[_ngcontent-%COMP%]:before{content:"";position:absolute;width:100%;height:100%;left:9px;top:10px;background-color:var(--primary-color);box-shadow:var(--purple-shadow);z-index:-2}a[_ngcontent-%COMP%]:before{left:0;top:0;background-color:#fff;z-index:-1}@media screen and (max-width: 720px){a[_ngcontent-%COMP%]{font-size:.9rem;min-width:auto}}',
					],
				}));
			class yo {}
			(yo.ɵfac = function (t) {
				return new (t || yo)();
			}),
				(yo.ɵcmp = ue({
					type: yo,
					selectors: [["app-title"]],
					decls: 5,
					vars: 0,
					consts: [[1, "container__title"]],
					template: function (t, n) {
						1 & t &&
							(C(0, "div", 0)(1, "h2"),
							I(2, "Game on!"),
							D(),
							C(3, "p"),
							I(
								4,
								" Fusce erat dui, venenatis et erat in, vulputate dignissim lacus. Donec vitae tempus dolor, sit amet elementum lorem. Ut cursus tempor turpis. "
							),
							D()());
					},
					styles: [
						".container__title[_ngcontent-%COMP%]{position:relative;text-align:center;max-width:1100px}.container__title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{position:relative;font-size:10rem;bottom:0;opacity:0;white-space:nowrap;animation:slide-top .5s .4s cubic-bezier(.25,.46,.45,.94) both}.container__title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.5rem;color:var(--tertiary-color);font-weight:500;opacity:0;margin-bottom:4rem;animation:slide-top .5s .6s cubic-bezier(.25,.46,.45,.94) both}@media screen and (max-width: 910px){.container__title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:7rem}.container__title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.3rem}}@media screen and (max-width: 720px){.container__title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:4.3rem}.container__title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1rem}}",
					],
				}));
			class _o {}
			(_o.ɵfac = function (t) {
				return new (t || _o)();
			}),
				(_o.ɵcmp = ue({
					type: _o,
					selectors: [["app-little-card"]],
					decls: 9,
					vars: 0,
					consts: [
						[1, "container__little-card"],
						[
							"src",
							"https://preview.colorlib.com/theme/endgam/img/blog/2.jpg.webp",
							"alt",
							"",
						],
					],
					template: function (t, n) {
						1 & t &&
							(C(0, "div", 0),
							$(1, "img", 1),
							C(2, "div")(3, "h3"),
							I(4, "11.11.22 / in "),
							C(5, "span"),
							I(6, "Games"),
							D()(),
							C(7, "h2"),
							I(8, "The best online game in out now"),
							D()()());
					},
					styles: [
						".container__little-card[_ngcontent-%COMP%]{display:flex;flex-wrap:nowrap;gap:1rem}.container__little-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80px;height:80px;object-fit:cover}.container__little-card[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-content:space-between;height:100%}.container__little-card[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:.75rem;margin-bottom:.5rem}.container__little-card[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--primary-color);font-size:.75rem}.container__little-card[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.125rem}",
					],
				}));
			class Co {}
			(Co.ɵfac = function (t) {
				return new (t || Co)();
			}),
				(Co.ɵcmp = ue({
					type: Co,
					selectors: [["app-home"]],
					decls: 28,
					vars: 1,
					consts: [
						[1, "banner-section"],
						[3, "label"],
						[1, "intro-section"],
						[1, "blog-section"],
						[1, "section__left"],
						[1, "section__right"],
						[1, "trending"],
						[1, "little-cards"],
					],
					template: function (t, n) {
						1 & t &&
							(C(0, "header"),
							$(1, "app-menu"),
							C(2, "div", 0),
							$(3, "app-title")(4, "app-stylized-button", 1),
							D()(),
							C(5, "section", 2)(6, "div"),
							$(7, "app-simple-card")(8, "app-simple-card")(
								9,
								"app-simple-card"
							),
							D()(),
							C(10, "section", 3)(11, "div")(12, "div", 4)(13, "h2"),
							I(14, "Latest News"),
							D(),
							$(15, "app-small-card")(16, "app-small-card")(
								17,
								"app-small-card"
							),
							D(),
							C(18, "div", 5)(19, "div", 6)(20, "h4"),
							I(21, "Trending"),
							D(),
							C(22, "div", 7),
							$(23, "app-little-card")(24, "app-little-card")(
								25,
								"app-little-card"
							)(26, "app-little-card"),
							D()()()()(),
							$(27, "app-big-card")),
							2 & t && (K(4), Ae("label", "Read More"));
					},
					dependencies: [Wr, Zr, mo, vo, Kr, yo, _o],
					styles: [
						"header[_ngcontent-%COMP%]{padding:0 2rem;background-image:url(bg-menu-home.6ea311992592fb91.webp);background-repeat:no-repeat;background-size:cover;background-position:center;border-bottom:2px solid var(--primary-color)}header[_ngcontent-%COMP%]   .banner-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;height:750px}.intro-section[_ngcontent-%COMP%]{background-color:#0c062e}.intro-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:grid;max-width:1500px;margin-inline:auto;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));justify-items:center;gap:1.5rem;padding:7rem 0}.intro-section[_ngcontent-%COMP%]   app-simple-card[_ngcontent-%COMP%]{margin:0 2rem;max-width:370px}.blog-section[_ngcontent-%COMP%]{padding:6.563rem 0;background:linear-gradient(45deg,#501755 0%,#2d1854 100%)}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:grid;grid-template-columns:3fr 1fr;justify-items:center;gap:2rem;max-width:1175px;margin-inline:auto}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .section__left[_ngcontent-%COMP%]{display:grid}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .section__left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-style:italic;text-transform:uppercase;padding-bottom:3rem;padding-left:2rem}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .section__left[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:nth-child(2){margin:0}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .section__left[_ngcontent-%COMP%]   app-small-card[_ngcontent-%COMP%]{display:inline-block;margin-top:5.375rem;padding:0 0 0 2rem}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .section__right[_ngcontent-%COMP%]{padding:0 2rem 0 0;width:100%}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .section__right[_ngcontent-%COMP%]   .trending[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:last-child{margin-bottom:0}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .section__right[_ngcontent-%COMP%]   .trending[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:1.5rem;font-style:italic;font-weight:700;text-transform:uppercase;padding-bottom:3rem}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .section__right[_ngcontent-%COMP%]   .trending[_ngcontent-%COMP%]   .little-cards[_ngcontent-%COMP%]{display:grid;gap:2rem;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));justify-items:center}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .section__right[_ngcontent-%COMP%]   .trending[_ngcontent-%COMP%]   app-little-card[_ngcontent-%COMP%]{display:inline-block}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .section__right[_ngcontent-%COMP%]   app-card-menu[_ngcontent-%COMP%]{display:block;padding:3rem 2rem;border-radius:1rem;background-color:var(--secondary-color);margin-top:5.313rem}@media screen and (max-width: 1000px){.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{grid-template-columns:1fr}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .section__left[_ngcontent-%COMP%]   app-small-card[_ngcontent-%COMP%]{padding:0 2rem}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .section__right[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{padding-left:2rem}.blog-section[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .section__right[_ngcontent-%COMP%]   .little-cards[_ngcontent-%COMP%]{padding-left:2rem}}",
					],
				}));
			const fd = [
				{
					id: "fortnite",
					name: "Fortnite",
					small_image:
						"https://4.bp.blogspot.com/-cg7RbXp55Us/WxcFYXQpTcI/AAAAAAAAMk4/-EhJzLvIykYDkO9NvIvXNmkqG9dpM2C3gCEwYBhgL/s1600/De84FOVVQAASVSV%2B%25281%2529.jpg",
					image:
						"https://cdn2.unrealengine.com/23br-c4s1-egs-launcher-pdp-2560x1440-2560x1440-70cf344c9005.jpg",
					logo: "https://www.pngkit.com/png/full/43-430888_our-fortnite-team-fortnite-logo-png-white.png",
					category: ["Games"],
					platform: [
						"PC",
						"Playstation 4",
						"Playstation 5",
						"Xbox One",
						"Xbox Series X/S",
						"Android",
					],
					genre: ["Battle Royale"],
					price: 5,
					graphic: 4,
					gameplay: 5,
					difficulty: 3,
					rating: 4.2,
					date_post: "21.07.2022",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et euismod lorem. Integer ornare velit at nisl rhoncus, a convallis nisi dapibus. Sed ullamcorper metus at rhoncus vehicula. Proin sapien ligula, scelerisque mollis est nec, ultricies vestibulum enim.",
					gameplay_text:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis mi id nunc ultrices dapibus. Curabitur suscipit congue eros sit amet dapibus. Curabitur vitae sagittis lacus. Nulla ac urna purus. Aenean ac lectus sem. Vivamus non ullamcorper elit. Vestibulum lobortis tortor felis, id bibendum nibh viverra ac. Fusce vestibulum feugiat erat in venenatis. Sed blandit porta eros sit amet venenatis.\nQuisque vulputate facilisis arcu. Etiam eget felis blandit, fringilla magna id, venenatis magna. Sed in enim eu sem lacinia pulvinar. In et pellentesque lorem. Nullam vel nunc laoreet dui posuere placerat. Proin consequat leo ac eros blandit, non blandit ante egestas. Donec dignissim, libero ac pulvinar ultrices, sem odio interdum sem, in commodo purus dui quis nisi. Donec dapibus nisi sit amet eros malesuada iaculis. Ut et velit tristique, auctor enim quis, viverra diam. In sed urna finibus, lobortis mi sollicitudin, malesuada arcu. Nam lorem lectus, vestibulum a pulvinar a, fermentum at dui. Phasellus at ligula erat. Sed eleifend sagittis augue quis bibendum. Curabitur ac urna non tortor suscipit ullamcorper. Vivamus eget erat ut est convallis maximus eget eget dui. Etiam venenatis fermentum metus, ut venenatis enim scelerisque vulputate.",
					conclusion_text:
						"Nunc vestibulum urna vel tortor porta, et rutrum ante tempus. Vestibulum odio ligula, porta ac vulputate vitae, vestibulum eu ligula. Cras purus ipsum, aliquet nec iaculis sit amet, feugiat at dui. Proin neque arcu, laoreet non mattis a, laoreet sit amet orci. Aenean pellentesque fermentum enim, eget venenatis magna tincidunt in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Ut cursus augue nibh. Donec sodales magna et elit elementum placerat. Donec dapibus arcu ac sapien placerat, ac placerat enim elementum. Nunc nec diam est. Aliquam in sem feugiat, iaculis felis ut, euismod libero.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus faucibus enim, in ultrices diam elementum sit amet. Vestibulum metus nulla, pretium interdum est eget, molestie ullamcorper urna. Pellentesque tempus enim est, et consectetur dolor lobortis sed. Duis egestas ultrices est at gravida. In laoreet rutrum tincidunt. Praesent sapien orci, porta quis nibh et, euismod laoreet risus. Praesent scelerisque vel risus ut vehicula. Aliquam pharetra erat eget lectus scelerisque finibus.",
					written_by: "Kel Vonfaenoy",
					author_photo:
						"https://i.pinimg.com/736x/ad/55/73/ad5573610b7ff7ded5850ba931589cc3.jpg",
					author_info:
						"Vivamus volutpat nibh ac sollicitudin imperdiet. Donec scelerisque lorem sodales odio ultricies, nec rhoncus ex lobortis. Vivamus tincid-unt sit amet sem id varius. Donec elementum aliquet tortor. Curabitur justo mi, efficitur sed eros alique.",
				},
				{
					id: "final-fantasy-xiv-a-realm-reborn",
					name: "Final Fantasy XIV: A Realm Reborn",
					small_image:
						"https://adrenaline.com.br/files/upload/noticias/2014/10/mateus/final_fantasy.jpg",
					image: "https://images5.alphacoders.com/424/thumb-1920-424221.jpg",
					logo: "https://store.markeedragon.com/images/ffxivlogo.png",
					category: ["Games"],
					platform: ["PC", "Playstation 4", "Playstation 5"],
					genre: ["MMORPG"],
					price: 4,
					graphic: 3,
					gameplay: 5,
					difficulty: 4,
					rating: 4,
					date_post: "14.08.2022",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et euismod lorem. Integer ornare velit at nisl rhoncus, a convallis nisi dapibus. Sed ullamcorper metus at rhoncus vehicula. Proin sapien ligula, scelerisque mollis est nec, ultricies vestibulum enim.",
					gameplay_text:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis mi id nunc ultrices dapibus. Curabitur suscipit congue eros sit amet dapibus. Curabitur vitae sagittis lacus. Nulla ac urna purus. Aenean ac lectus sem. Vivamus non ullamcorper elit. Vestibulum lobortis tortor felis, id bibendum nibh viverra ac. Fusce vestibulum feugiat erat in venenatis. Sed blandit porta eros sit amet venenatis.\nQuisque vulputate facilisis arcu. Etiam eget felis blandit, fringilla magna id, venenatis magna. Sed in enim eu sem lacinia pulvinar. In et pellentesque lorem. Nullam vel nunc laoreet dui posuere placerat. Proin consequat leo ac eros blandit, non blandit ante egestas. Donec dignissim, libero ac pulvinar ultrices, sem odio interdum sem, in commodo purus dui quis nisi. Donec dapibus nisi sit amet eros malesuada iaculis. Ut et velit tristique, auctor enim quis, viverra diam. In sed urna finibus, lobortis mi sollicitudin, malesuada arcu. Nam lorem lectus, vestibulum a pulvinar a, fermentum at dui. Phasellus at ligula erat. Sed eleifend sagittis augue quis bibendum. Curabitur ac urna non tortor suscipit ullamcorper. Vivamus eget erat ut est convallis maximus eget eget dui. Etiam venenatis fermentum metus, ut venenatis enim scelerisque vulputate.",
					conclusion_text:
						"Nunc vestibulum urna vel tortor porta, et rutrum ante tempus. Vestibulum odio ligula, porta ac vulputate vitae, vestibulum eu ligula. Cras purus ipsum, aliquet nec iaculis sit amet, feugiat at dui. Proin neque arcu, laoreet non mattis a, laoreet sit amet orci. Aenean pellentesque fermentum enim, eget venenatis magna tincidunt in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Ut cursus augue nibh. Donec sodales magna et elit elementum placerat. Donec dapibus arcu ac sapien placerat, ac placerat enim elementum. Nunc nec diam est. Aliquam in sem feugiat, iaculis felis ut, euismod libero.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus faucibus enim, in ultrices diam elementum sit amet. Vestibulum metus nulla, pretium interdum est eget, molestie ullamcorper urna. Pellentesque tempus enim est, et consectetur dolor lobortis sed. Duis egestas ultrices est at gravida. In laoreet rutrum tincidunt. Praesent sapien orci, porta quis nibh et, euismod laoreet risus. Praesent scelerisque vel risus ut vehicula. Aliquam pharetra erat eget lectus scelerisque finibus.",
					written_by: "Glorrim Luarn",
					author_photo:
						"https://profilepicture7.com/img/img_dongman/1/1212513148.jpg",
					author_info:
						"Vivamus volutpat nibh ac sollicitudin imperdiet. Donec scelerisque lorem sodales odio ultricies, nec rhoncus ex lobortis. Vivamus tincid-unt sit amet sem id varius. Donec elementum aliquet tortor. Curabitur justo mi, efficitur sed eros alique.",
				},
				{
					id: "valorant",
					name: "Valorant",
					small_image:
						"https://cdn.pocket-lint.com/r/s/970x/assets/images/152432-games-feature-what-is-valorant-a-guide-to-the-free-to-play-fps-with-tips-on-how-to-win-image3-muha6tfgev.jpg",
					image:
						"https://coolhdwall.com/storage/2203/neon-valorant-hd-wallpaper-1920x1080-28.jpg",
					logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/1280px-Valorant_logo_-_pink_color_version.svg.png",
					category: ["Games"],
					platform: ["PC"],
					genre: ["FPS"],
					price: 5,
					graphic: 3,
					gameplay: 3,
					difficulty: 4,
					rating: 3.7,
					date_post: "22.08.2022",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et euismod lorem. Integer ornare velit at nisl rhoncus, a convallis nisi dapibus. Sed ullamcorper metus at rhoncus vehicula. Proin sapien ligula, scelerisque mollis est nec, ultricies vestibulum enim.",
					gameplay_text:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis mi id nunc ultrices dapibus. Curabitur suscipit congue eros sit amet dapibus. Curabitur vitae sagittis lacus. Nulla ac urna purus. Aenean ac lectus sem. Vivamus non ullamcorper elit. Vestibulum lobortis tortor felis, id bibendum nibh viverra ac. Fusce vestibulum feugiat erat in venenatis. Sed blandit porta eros sit amet venenatis.\nQuisque vulputate facilisis arcu. Etiam eget felis blandit, fringilla magna id, venenatis magna. Sed in enim eu sem lacinia pulvinar. In et pellentesque lorem. Nullam vel nunc laoreet dui posuere placerat. Proin consequat leo ac eros blandit, non blandit ante egestas. Donec dignissim, libero ac pulvinar ultrices, sem odio interdum sem, in commodo purus dui quis nisi. Donec dapibus nisi sit amet eros malesuada iaculis. Ut et velit tristique, auctor enim quis, viverra diam. In sed urna finibus, lobortis mi sollicitudin, malesuada arcu. Nam lorem lectus, vestibulum a pulvinar a, fermentum at dui. Phasellus at ligula erat. Sed eleifend sagittis augue quis bibendum. Curabitur ac urna non tortor suscipit ullamcorper. Vivamus eget erat ut est convallis maximus eget eget dui. Etiam venenatis fermentum metus, ut venenatis enim scelerisque vulputate.",
					conclusion_text:
						"Nunc vestibulum urna vel tortor porta, et rutrum ante tempus. Vestibulum odio ligula, porta ac vulputate vitae, vestibulum eu ligula. Cras purus ipsum, aliquet nec iaculis sit amet, feugiat at dui. Proin neque arcu, laoreet non mattis a, laoreet sit amet orci. Aenean pellentesque fermentum enim, eget venenatis magna tincidunt in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Ut cursus augue nibh. Donec sodales magna et elit elementum placerat. Donec dapibus arcu ac sapien placerat, ac placerat enim elementum. Nunc nec diam est. Aliquam in sem feugiat, iaculis felis ut, euismod libero.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus faucibus enim, in ultrices diam elementum sit amet. Vestibulum metus nulla, pretium interdum est eget, molestie ullamcorper urna. Pellentesque tempus enim est, et consectetur dolor lobortis sed. Duis egestas ultrices est at gravida. In laoreet rutrum tincidunt. Praesent sapien orci, porta quis nibh et, euismod laoreet risus. Praesent scelerisque vel risus ut vehicula. Aliquam pharetra erat eget lectus scelerisque finibus.",
					written_by: "Kel Vonfaenoy",
					author_photo:
						"https://profilepicture7.com/img/img_dongman/1/879871673.jpg",
					author_info:
						"Vivamus volutpat nibh ac sollicitudin imperdiet. Donec scelerisque lorem sodales odio ultricies, nec rhoncus ex lobortis. Vivamus tincid-unt sit amet sem id varius. Donec elementum aliquet tortor. Curabitur justo mi, efficitur sed eros alique.",
				},
				{
					id: "wow",
					name: "World of Warcraft",
					small_image:
						"https://www.leak.pt/wp-content/uploads/2022/04/world-of-warcraft-696x365.jpg",
					image: "https://images5.alphacoders.com/123/thumb-1920-1230599.png",
					logo: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt563e16b3504e5808/62545b180afb5024ae74b677/rc-logo-na.png",
					category: ["Games"],
					platform: ["PC"],
					genre: ["MMORPG"],
					price: 4,
					graphic: 2,
					gameplay: 4,
					difficulty: 5,
					rating: 3.7,
					date_post: "29.08.2022",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et euismod lorem. Integer ornare velit at nisl rhoncus, a convallis nisi dapibus. Sed ullamcorper metus at rhoncus vehicula. Proin sapien ligula, scelerisque mollis est nec, ultricies vestibulum enim.",
					gameplay_text:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis mi id nunc ultrices dapibus. Curabitur suscipit congue eros sit amet dapibus. Curabitur vitae sagittis lacus. Nulla ac urna purus. Aenean ac lectus sem. Vivamus non ullamcorper elit. Vestibulum lobortis tortor felis, id bibendum nibh viverra ac. Fusce vestibulum feugiat erat in venenatis. Sed blandit porta eros sit amet venenatis.\nQuisque vulputate facilisis arcu. Etiam eget felis blandit, fringilla magna id, venenatis magna. Sed in enim eu sem lacinia pulvinar. In et pellentesque lorem. Nullam vel nunc laoreet dui posuere placerat. Proin consequat leo ac eros blandit, non blandit ante egestas. Donec dignissim, libero ac pulvinar ultrices, sem odio interdum sem, in commodo purus dui quis nisi. Donec dapibus nisi sit amet eros malesuada iaculis. Ut et velit tristique, auctor enim quis, viverra diam. In sed urna finibus, lobortis mi sollicitudin, malesuada arcu. Nam lorem lectus, vestibulum a pulvinar a, fermentum at dui. Phasellus at ligula erat. Sed eleifend sagittis augue quis bibendum. Curabitur ac urna non tortor suscipit ullamcorper. Vivamus eget erat ut est convallis maximus eget eget dui. Etiam venenatis fermentum metus, ut venenatis enim scelerisque vulputate.",
					conclusion_text:
						"Nunc vestibulum urna vel tortor porta, et rutrum ante tempus. Vestibulum odio ligula, porta ac vulputate vitae, vestibulum eu ligula. Cras purus ipsum, aliquet nec iaculis sit amet, feugiat at dui. Proin neque arcu, laoreet non mattis a, laoreet sit amet orci. Aenean pellentesque fermentum enim, eget venenatis magna tincidunt in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Ut cursus augue nibh. Donec sodales magna et elit elementum placerat. Donec dapibus arcu ac sapien placerat, ac placerat enim elementum. Nunc nec diam est. Aliquam in sem feugiat, iaculis felis ut, euismod libero.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus faucibus enim, in ultrices diam elementum sit amet. Vestibulum metus nulla, pretium interdum est eget, molestie ullamcorper urna. Pellentesque tempus enim est, et consectetur dolor lobortis sed. Duis egestas ultrices est at gravida. In laoreet rutrum tincidunt. Praesent sapien orci, porta quis nibh et, euismod laoreet risus. Praesent scelerisque vel risus ut vehicula. Aliquam pharetra erat eget lectus scelerisque finibus.",
					written_by: "Ushuo Muarmuiso",
					author_photo:
						"https://i.pinimg.com/564x/51/dd/0f/51dd0f8f5b5612528c9f77f7ff39ad97.jpg",
					author_info:
						"Vivamus volutpat nibh ac sollicitudin imperdiet. Donec scelerisque lorem sodales odio ultricies, nec rhoncus ex lobortis. Vivamus tincid-unt sit amet sem id varius. Donec elementum aliquet tortor. Curabitur justo mi, efficitur sed eros alique.",
				},
				{
					id: "lol",
					name: "League of Legends",
					small_image:
						"https://www.global-esports.news/wp-content/uploads/2021/12/League-of-Legends-Event-Pass.jpg",
					image:
						"https://i0.wp.com/gamehall.com.br/wp-content/uploads/2019/02/League-of-Legends-KeyArt-com-Campe%C3%B5es-Wallpaper-Full-HD.jpg?ssl=1",
					logo: "https://www.leagueoflegends.com/static/logo-1200-589b3ef693ce8a750fa4b4704f1e61f2.png",
					category: ["Games"],
					platform: ["PC"],
					genre: ["Moba"],
					price: 5,
					graphic: 3.4,
					gameplay: 3.5,
					difficulty: 4,
					rating: 3.9,
					date_post: "07.09.2022",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et euismod lorem. Integer ornare velit at nisl rhoncus, a convallis nisi dapibus. Sed ullamcorper metus at rhoncus vehicula. Proin sapien ligula, scelerisque mollis est nec, ultricies vestibulum enim.",
					gameplay_text:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis mi id nunc ultrices dapibus. Curabitur suscipit congue eros sit amet dapibus. Curabitur vitae sagittis lacus. Nulla ac urna purus. Aenean ac lectus sem. Vivamus non ullamcorper elit. Vestibulum lobortis tortor felis, id bibendum nibh viverra ac. Fusce vestibulum feugiat erat in venenatis. Sed blandit porta eros sit amet venenatis.\nQuisque vulputate facilisis arcu. Etiam eget felis blandit, fringilla magna id, venenatis magna. Sed in enim eu sem lacinia pulvinar. In et pellentesque lorem. Nullam vel nunc laoreet dui posuere placerat. Proin consequat leo ac eros blandit, non blandit ante egestas. Donec dignissim, libero ac pulvinar ultrices, sem odio interdum sem, in commodo purus dui quis nisi. Donec dapibus nisi sit amet eros malesuada iaculis. Ut et velit tristique, auctor enim quis, viverra diam. In sed urna finibus, lobortis mi sollicitudin, malesuada arcu. Nam lorem lectus, vestibulum a pulvinar a, fermentum at dui. Phasellus at ligula erat. Sed eleifend sagittis augue quis bibendum. Curabitur ac urna non tortor suscipit ullamcorper. Vivamus eget erat ut est convallis maximus eget eget dui. Etiam venenatis fermentum metus, ut venenatis enim scelerisque vulputate.",
					conclusion_text:
						"Nunc vestibulum urna vel tortor porta, et rutrum ante tempus. Vestibulum odio ligula, porta ac vulputate vitae, vestibulum eu ligula. Cras purus ipsum, aliquet nec iaculis sit amet, feugiat at dui. Proin neque arcu, laoreet non mattis a, laoreet sit amet orci. Aenean pellentesque fermentum enim, eget venenatis magna tincidunt in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Ut cursus augue nibh. Donec sodales magna et elit elementum placerat. Donec dapibus arcu ac sapien placerat, ac placerat enim elementum. Nunc nec diam est. Aliquam in sem feugiat, iaculis felis ut, euismod libero.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus faucibus enim, in ultrices diam elementum sit amet. Vestibulum metus nulla, pretium interdum est eget, molestie ullamcorper urna. Pellentesque tempus enim est, et consectetur dolor lobortis sed. Duis egestas ultrices est at gravida. In laoreet rutrum tincidunt. Praesent sapien orci, porta quis nibh et, euismod laoreet risus. Praesent scelerisque vel risus ut vehicula. Aliquam pharetra erat eget lectus scelerisque finibus.",
					written_by: "Kel Vonfaenoy",
					author_photo:
						"https://profilepicture7.com/img/img_dongman/1/879871673.jpg",
					author_info:
						"Vivamus volutpat nibh ac sollicitudin imperdiet. Donec scelerisque lorem sodales odio ultricies, nec rhoncus ex lobortis. Vivamus tincid-unt sit amet sem id varius. Donec elementum aliquet tortor. Curabitur justo mi, efficitur sed eros alique.",
				},
				{
					id: "elden-ring",
					name: "Elden Ring",
					small_image:
						"https://m.media-amazon.com/images/I/71ev4zZlqcL._CR204,0,525,525_UX256.jpg",
					image: "https://www.videogameschronicle.com/files/2022/02/sds5.jpg",
					logo: "https://cdn2.steamgriddb.com/file/sgdb-cdn/logo/6076036fdb272f49688c571013f3ede1.png",
					category: ["Games"],
					platform: [
						"PC",
						"Playstation 4",
						"Playstation 5",
						"Xbox One",
						"Xbox Series X/S",
					],
					genre: ["Action RPG"],
					price: 3,
					graphic: 5,
					gameplay: 5,
					difficulty: 5,
					rating: 4.5,
					date_post: "15.09.2022",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et euismod lorem. Integer ornare velit at nisl rhoncus, a convallis nisi dapibus. Sed ullamcorper metus at rhoncus vehicula. Proin sapien ligula, scelerisque mollis est nec, ultricies vestibulum enim.",
					gameplay_text:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis mi id nunc ultrices dapibus. Curabitur suscipit congue eros sit amet dapibus. Curabitur vitae sagittis lacus. Nulla ac urna purus. Aenean ac lectus sem. Vivamus non ullamcorper elit. Vestibulum lobortis tortor felis, id bibendum nibh viverra ac. Fusce vestibulum feugiat erat in venenatis. Sed blandit porta eros sit amet venenatis.\nQuisque vulputate facilisis arcu. Etiam eget felis blandit, fringilla magna id, venenatis magna. Sed in enim eu sem lacinia pulvinar. In et pellentesque lorem. Nullam vel nunc laoreet dui posuere placerat. Proin consequat leo ac eros blandit, non blandit ante egestas. Donec dignissim, libero ac pulvinar ultrices, sem odio interdum sem, in commodo purus dui quis nisi. Donec dapibus nisi sit amet eros malesuada iaculis. Ut et velit tristique, auctor enim quis, viverra diam. In sed urna finibus, lobortis mi sollicitudin, malesuada arcu. Nam lorem lectus, vestibulum a pulvinar a, fermentum at dui. Phasellus at ligula erat. Sed eleifend sagittis augue quis bibendum. Curabitur ac urna non tortor suscipit ullamcorper. Vivamus eget erat ut est convallis maximus eget eget dui. Etiam venenatis fermentum metus, ut venenatis enim scelerisque vulputate.",
					conclusion_text:
						"Nunc vestibulum urna vel tortor porta, et rutrum ante tempus. Vestibulum odio ligula, porta ac vulputate vitae, vestibulum eu ligula. Cras purus ipsum, aliquet nec iaculis sit amet, feugiat at dui. Proin neque arcu, laoreet non mattis a, laoreet sit amet orci. Aenean pellentesque fermentum enim, eget venenatis magna tincidunt in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Ut cursus augue nibh. Donec sodales magna et elit elementum placerat. Donec dapibus arcu ac sapien placerat, ac placerat enim elementum. Nunc nec diam est. Aliquam in sem feugiat, iaculis felis ut, euismod libero.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus faucibus enim, in ultrices diam elementum sit amet. Vestibulum metus nulla, pretium interdum est eget, molestie ullamcorper urna. Pellentesque tempus enim est, et consectetur dolor lobortis sed. Duis egestas ultrices est at gravida. In laoreet rutrum tincidunt. Praesent sapien orci, porta quis nibh et, euismod laoreet risus. Praesent scelerisque vel risus ut vehicula. Aliquam pharetra erat eget lectus scelerisque finibus.",
					written_by: "Kelly Wilkins",
					author_photo:
						"https://i.pinimg.com/originals/91/8b/9f/918b9f91374efe808c8ec7d5139af1e8.jpg",
					author_info:
						"Vivamus volutpat nibh ac sollicitudin imperdiet. Donec scelerisque lorem sodales odio ultricies, nec rhoncus ex lobortis. Vivamus tincid-unt sit amet sem id varius. Donec elementum aliquet tortor. Curabitur justo mi, efficitur sed eros alique.",
				},
				{
					id: "gow-ragnarok",
					name: "God Of War Ragnarok",
					small_image:
						"https://cdn.ome.lt/2d1ONPmHgbXFnGfhuzELeo4st2k=/770x0/smart/uploads/conteudo/fotos/God_of_War_Ragnarok_arte_ZbKsYs1.png",
					image:
						"https://melhoresdomundo.net/wp-content/uploads/2022/11/god-of-war-ragnarok-sales-1.jpg",
					logo: "https://i.pinimg.com/originals/73/9f/1f/739f1fbb30565e9cb1d880ad91447c5e.png",
					category: ["Games"],
					platform: ["Playstation 4", "Playstation 5"],
					genre: ["Action RPG"],
					price: 2.5,
					graphic: 5,
					gameplay: 5,
					difficulty: 3.5,
					rating: 4,
					date_post: "26.09.2022",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et euismod lorem. Integer ornare velit at nisl rhoncus, a convallis nisi dapibus. Sed ullamcorper metus at rhoncus vehicula. Proin sapien ligula, scelerisque mollis est nec, ultricies vestibulum enim.",
					gameplay_text:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis mi id nunc ultrices dapibus. Curabitur suscipit congue eros sit amet dapibus. Curabitur vitae sagittis lacus. Nulla ac urna purus. Aenean ac lectus sem. Vivamus non ullamcorper elit. Vestibulum lobortis tortor felis, id bibendum nibh viverra ac. Fusce vestibulum feugiat erat in venenatis. Sed blandit porta eros sit amet venenatis.\nQuisque vulputate facilisis arcu. Etiam eget felis blandit, fringilla magna id, venenatis magna. Sed in enim eu sem lacinia pulvinar. In et pellentesque lorem. Nullam vel nunc laoreet dui posuere placerat. Proin consequat leo ac eros blandit, non blandit ante egestas. Donec dignissim, libero ac pulvinar ultrices, sem odio interdum sem, in commodo purus dui quis nisi. Donec dapibus nisi sit amet eros malesuada iaculis. Ut et velit tristique, auctor enim quis, viverra diam. In sed urna finibus, lobortis mi sollicitudin, malesuada arcu. Nam lorem lectus, vestibulum a pulvinar a, fermentum at dui. Phasellus at ligula erat. Sed eleifend sagittis augue quis bibendum. Curabitur ac urna non tortor suscipit ullamcorper. Vivamus eget erat ut est convallis maximus eget eget dui. Etiam venenatis fermentum metus, ut venenatis enim scelerisque vulputate.",
					conclusion_text:
						"Nunc vestibulum urna vel tortor porta, et rutrum ante tempus. Vestibulum odio ligula, porta ac vulputate vitae, vestibulum eu ligula. Cras purus ipsum, aliquet nec iaculis sit amet, feugiat at dui. Proin neque arcu, laoreet non mattis a, laoreet sit amet orci. Aenean pellentesque fermentum enim, eget venenatis magna tincidunt in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Ut cursus augue nibh. Donec sodales magna et elit elementum placerat. Donec dapibus arcu ac sapien placerat, ac placerat enim elementum. Nunc nec diam est. Aliquam in sem feugiat, iaculis felis ut, euismod libero.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus faucibus enim, in ultrices diam elementum sit amet. Vestibulum metus nulla, pretium interdum est eget, molestie ullamcorper urna. Pellentesque tempus enim est, et consectetur dolor lobortis sed. Duis egestas ultrices est at gravida. In laoreet rutrum tincidunt. Praesent sapien orci, porta quis nibh et, euismod laoreet risus. Praesent scelerisque vel risus ut vehicula. Aliquam pharetra erat eget lectus scelerisque finibus.",
					written_by: "Carmen Krueger",
					author_photo:
						"https://i.pinimg.com/474x/38/30/80/38308010d7189aaf72e3ad6e0c9da885.jpg",
					author_info:
						"Vivamus volutpat nibh ac sollicitudin imperdiet. Donec scelerisque lorem sodales odio ultricies, nec rhoncus ex lobortis. Vivamus tincid-unt sit amet sem id varius. Donec elementum aliquet tortor. Curabitur justo mi, efficitur sed eros alique.",
				},
			];
			function ox(e, t) {
				if (1 & e) {
					const n = (function zp() {
						return v();
					})();
					C(0, "li")(1, "a", 2),
						Fi("click", function () {
							const o = (function df(e) {
								return (j.lFrame.contextLView = e), e[8];
							})(n).$implicit;
							return (function ff(e) {
								return (j.lFrame.contextLView = null), e;
							})(Yp().filterGames(o[0]));
						}),
						I(2),
						D()();
				}
				if (2 & e) {
					const n = t.$implicit;
					K(2), en(n[0]);
				}
			}
			class Do {
				constructor() {
					(this.title = "Card Menu"), (this.items = []);
				}
				filterGames(t) {
					console.log(t),
						fd.filter(function n(i) {
							for (let o = 0; o < i.platform.length; o++) {
								if (i.platform[o] === t) return console.log(i), i;
								if (i.genre[o] === t) return console.log(i), i;
							}
						});
				}
			}
			(Do.ɵfac = function (t) {
				return new (t || Do)();
			}),
				(Do.ɵcmp = ue({
					type: Do,
					selectors: [["app-card-menu"]],
					inputs: { title: "title", items: "items" },
					decls: 5,
					vars: 2,
					consts: [
						[1, "container__card-menu"],
						[4, "ngFor", "ngForOf"],
						[3, "click"],
					],
					template: function (t, n) {
						1 & t &&
							(C(0, "div", 0)(1, "h2"),
							I(2),
							D(),
							C(3, "ul"),
							Ni(4, ox, 3, 1, "li", 1),
							D()()),
							2 & t && (K(2), en(n.title), K(2), Ae("ngForOf", n.items));
					},
					dependencies: [Cc],
					styles: [
						".container__card-menu[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{text-transform:uppercase;font-weight:700;font-style:italic;font-size:1.5rem;margin-bottom:2.5rem}.container__card-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{position:relative}.container__card-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;font-weight:500;margin-bottom:15px;color:var(--quartenary-color);padding-right:1.188rem;transition:all .2s;background-image:url(double-arrow.794945033943c11e.webp);background-repeat:no-repeat;background-position:right -120% center;background-size:11px}.container__card-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--primary-color);background-position:right center}",
					],
				}));
			const $_ = function (e) {
				return [e];
			};
			class wo {
				constructor() {
					this.id = "";
				}
			}
			function sx(e, t) {
				if ((1 & e && (C(0, "a"), I(1), D()), 2 & e)) {
					const n = t.$implicit;
					K(1), en(n);
				}
			}
			function ax(e, t) {
				if ((1 & e && $(0, "app-game-card", 9), 2 & e)) {
					const n = t.$implicit;
					Ae("parameter", n)("id", n.id);
				}
			}
			(wo.ɵfac = function (t) {
				return new (t || wo)();
			}),
				(wo.ɵcmp = ue({
					type: wo,
					selectors: [["app-game-card"]],
					inputs: { parameter: "parameter", id: "id" },
					decls: 7,
					vars: 9,
					consts: [
						[1, "container__game-card"],
						[1, "game-image", 3, "routerLink"],
						["alt", "", 3, "src"],
						[3, "routerLink"],
						[3, "link"],
					],
					template: function (t, n) {
						1 & t &&
							(C(0, "div", 0)(1, "a", 1),
							$(2, "img", 2),
							D(),
							C(3, "a", 3)(4, "h2"),
							I(5),
							D()(),
							$(6, "app-button", 4),
							D()),
							2 & t &&
								(K(1),
								Ae("routerLink", n.id),
								K(1),
								Or("src", ks(5, $_, n.parameter.small_image), pr),
								K(1),
								Ae("routerLink", n.id),
								K(2),
								en(ks(7, $_, n.parameter.name)),
								K(1),
								Ae("link", n.id));
					},
					dependencies: [Qr, Wn],
					styles: [
						".container__game-card[_ngcontent-%COMP%]{width:200px}.container__game-card[_ngcontent-%COMP%]   .game-image[_ngcontent-%COMP%]{display:inline-block;width:100%;height:200px;overflow:hidden;border-radius:1rem}.container__game-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:relative;height:200px;left:50%;transform:translate(-50%)}.container__game-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.25rem;margin:1.875rem 0 1.25rem}",
					],
				}));
			class bo {
				constructor() {
					(this.alphabet = [
						"A",
						"B",
						"C",
						"D",
						"E",
						"F",
						"G",
						"H",
						"I",
						"J",
						"K",
						"L",
						"M",
						"N",
						"O",
						"P",
						"Q",
						"R",
						"S",
						"T",
						"U",
						"V",
						"W",
						"X",
						"Y",
						"Z",
					]),
						(this.cards = fd),
						(this.platforms = []),
						(this.genres = []);
				}
				ngOnInit() {
					for (let t = 0; t < this.cards.length; t++)
						for (let n = 0; n < this.cards[t].platform.length; n++) {
							let r = 0,
								i = this.cards[t].platform[n];
							for (let o = 0; o < this.platforms.length; o++)
								i === this.platforms[o][0] && r++;
							if (0 === r) {
								const o = [i, i.replace(/[ /]/g, "-").toLowerCase()];
								this.platforms.push(o);
							}
						}
					for (let t = 0; t < this.cards.length; t++)
						for (let n = 0; n < this.cards[t].genre.length; n++) {
							let r = 0,
								i = this.cards[t].genre[n];
							for (let o = 0; o < this.genres.length; o++)
								i === this.genres[o][0] && r++;
							if (0 === r) {
								const o = [i, i.replace(/[ /]/g, "-").toLowerCase()];
								this.genres.push(o);
							}
						}
				}
			}
			(bo.ɵfac = function (t) {
				return new (t || bo)();
			}),
				(bo.ɵcmp = ue({
					type: bo,
					selectors: [["app-games"]],
					decls: 10,
					vars: 6,
					consts: [
						[1, "container"],
						[1, "content"],
						[1, "letter"],
						[4, "ngFor", "ngForOf"],
						[1, "content-main"],
						[1, "cards"],
						[3, "parameter", "id", 4, "ngFor", "ngForOf"],
						[1, "menu-list"],
						[3, "title", "items"],
						[3, "parameter", "id"],
					],
					template: function (t, n) {
						1 & t &&
							(C(0, "section", 0)(1, "div", 1)(2, "div", 2),
							Ni(3, sx, 2, 1, "a", 3),
							D(),
							C(4, "div", 4)(5, "div", 5),
							Ni(6, ax, 1, 2, "app-game-card", 6),
							D(),
							C(7, "div", 7),
							$(8, "app-card-menu", 8)(9, "app-card-menu", 8),
							D()()()()),
							2 & t &&
								(K(3),
								Ae("ngForOf", n.alphabet),
								K(3),
								Ae("ngForOf", n.cards),
								K(2),
								Ae("title", "Platform")("items", n.platforms),
								K(1),
								Ae("title", "Genre")("items", n.genres));
					},
					dependencies: [Cc, Do, wo],
					styles: [
						".container[_ngcontent-%COMP%]{background:linear-gradient(45deg,#501755 0%,#2d1854 100%);padding:6.75rem 0}.content[_ngcontent-%COMP%]{max-width:1180px;padding:0 2rem;margin-inline:auto}.content-main[_ngcontent-%COMP%]{display:grid;grid-template-columns:3fr 16.625rem;gap:2rem}.letter[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-bottom:5.125rem;justify-content:center;gap:3px}.letter[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-flex;height:35px;width:40px;border-radius:40%;background-color:#503c6e;align-items:center;justify-content:center;transition:all .2s}.letter[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:#c313b7;transition:all .2s}.cards[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(12.5rem,12.5rem));gap:2rem;justify-content:space-evenly}.cards[_ngcontent-%COMP%]   app-game-card[_ngcontent-%COMP%]{margin-bottom:2rem}.menu-list[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:first-child{margin-top:0}.menu-list[_ngcontent-%COMP%]   app-card-menu[_ngcontent-%COMP%]{display:block;padding:3rem 2rem;border-radius:1rem;background-color:var(--secondary-color);margin-top:5.313rem}@media screen and (max-width: 800px){.content-main[_ngcontent-%COMP%]{grid-template-columns:1fr}}",
					],
				}));
			class Mo {}
			(Mo.ɵfac = function (t) {
				return new (t || Mo)();
			}),
				(Mo.ɵcmp = ue({
					type: Mo,
					selectors: [["app-blog"]],
					decls: 2,
					vars: 0,
					template: function (t, n) {
						1 & t && (C(0, "p"), I(1, "reviews works!"), D());
					},
				}));
			class Eo {}
			(Eo.ɵfac = function (t) {
				return new (t || Eo)();
			}),
				(Eo.ɵcmp = ue({
					type: Eo,
					selectors: [["app-contact"]],
					decls: 2,
					vars: 0,
					template: function (t, n) {
						1 & t && (C(0, "p"), I(1, "contact works!"), D());
					},
				}));
			class Io {
				constructor(t) {
					(this.route = t),
						(this.id = ""),
						(this.gameName = ""),
						(this.imageUrl = ""),
						(this.logoUrl = ""),
						(this.publishedDate = ""),
						(this.gameplayText = ""),
						(this.conclusionText = ""),
						(this.priceRating = 0),
						(this.graphicRating = 0),
						(this.gameplayRating = 0),
						(this.difficultyRating = 0),
						(this.totalRating = 0),
						(this.authorName = ""),
						(this.authorPhoto = ""),
						(this.authorDescription = "");
				}
				ngOnInit() {
					this.route.paramMap.subscribe((t) => (this.id = t.get("id"))),
						this.setContentToComponent(this.id);
				}
				setContentToComponent(t) {
					const n = fd.filter((r) => r.id === t)[0];
					(this.gameName = n.name),
						(this.imageUrl = n.image),
						(this.logoUrl = n.logo),
						(this.publishedDate = n.date_post),
						(this.gameplayText = n.gameplay_text),
						(this.conclusionText = n.conclusion_text),
						(this.priceRating = n.price),
						(this.graphicRating = n.graphic),
						(this.gameplayRating = n.gameplay),
						(this.difficultyRating = n.difficulty),
						(this.totalRating = n.rating),
						(this.authorName = n.written_by),
						(this.authorPhoto = n.author_photo),
						(this.authorDescription = n.author_info);
				}
			}
			(Io.ɵfac = function (t) {
				return new (t || Io)(P(Gn));
			}),
				(Io.ɵcmp = ue({
					type: Io,
					selectors: [["app-details-page"]],
					decls: 64,
					vars: 14,
					consts: [
						[1, "container__details-page"],
						[1, "content-container"],
						[1, "image-container"],
						["alt", "", 1, "banner", 3, "src"],
						["alt", "", 1, "logo", 3, "src"],
						[1, "content"],
						[1, "main"],
						[1, "date"],
						[1, "title"],
						[1, "gameplay"],
						[1, "subtitle"],
						[1, "conclusion"],
						[1, "share"],
						[1, "right"],
						[1, "rating"],
						[1, "rating-title"],
						[1, "rating-number"],
						[1, "white-text"],
						[1, "author"],
						[1, "image-avatar"],
						["alt", "", 3, "src"],
						[1, "author-text"],
					],
					template: function (t, n) {
						1 & t &&
							(C(0, "div", 0)(1, "div", 1)(2, "div", 2),
							$(3, "img", 3)(4, "img", 4),
							D(),
							C(5, "div", 5)(6, "div", 6)(7, "p", 7),
							I(8),
							C(9, "span"),
							I(10, "Games"),
							D()(),
							C(11, "h2", 8),
							I(12),
							D(),
							C(13, "div", 9)(14, "h4", 10),
							I(15, "Gameplay"),
							D(),
							C(16, "p"),
							I(17),
							D()(),
							C(18, "div", 11)(19, "h4", 10),
							I(20, "Conclusion"),
							D(),
							C(21, "p"),
							I(22),
							D()(),
							C(23, "div", 12)(24, "span"),
							I(25, "Share: "),
							D(),
							$(26, "app-social-media"),
							D()(),
							C(27, "div", 13)(28, "div", 14)(29, "h4"),
							I(30, "Ratings"),
							D(),
							C(31, "ul")(32, "li"),
							I(33, " Price "),
							C(34, "span"),
							I(35),
							D()(),
							C(36, "li"),
							I(37, " Graphics "),
							C(38, "span"),
							I(39),
							D()(),
							C(40, "li"),
							I(41, " Gameplay "),
							C(42, "span"),
							I(43),
							D()(),
							C(44, "li"),
							I(45, " Difficulty "),
							C(46, "span"),
							I(47),
							D()()(),
							C(48, "h5")(49, "span", 15),
							I(50, "Rating"),
							D(),
							C(51, "span", 16),
							I(52),
							C(53, "span", 17),
							I(54, " / 5"),
							D()()()()()()()(),
							C(55, "div", 18)(56, "div")(57, "div", 19),
							$(58, "img", 20),
							D(),
							C(59, "div", 21)(60, "h3"),
							I(61),
							D(),
							C(62, "p"),
							I(63),
							D()()()()),
							2 & t &&
								(K(3),
								Or("src", n.imageUrl, pr),
								K(1),
								Or("src", n.logoUrl, pr),
								K(4),
								ft("", n.publishedDate, " / in "),
								K(4),
								en(n.gameName),
								K(5),
								ft(" ", n.gameplayText, " "),
								K(5),
								ft(" ", n.conclusionText, " "),
								K(13),
								ft("", n.priceRating, "/5"),
								K(4),
								ft("", n.graphicRating, "/5"),
								K(4),
								ft("", n.gameplayRating, "/5"),
								K(4),
								ft("", n.difficultyRating, "/5"),
								K(5),
								en(n.totalRating),
								K(6),
								Or("src", n.authorPhoto, pr),
								K(3),
								ft("Written by: ", n.authorName, ""),
								K(2),
								ft(" ", n.authorDescription, " "));
					},
					dependencies: [Qn],
					styles: [
						"p[_ngcontent-%COMP%]{font-weight:500;color:var(--quartenary-color);line-height:1.8;text-align:justify}.container__details-page[_ngcontent-%COMP%]{background:linear-gradient(45deg,#501755 0%,#2d1854 100%);padding:6.5rem 2rem}.content-container[_ngcontent-%COMP%]{max-width:1180px;margin-inline:auto}.content[_ngcontent-%COMP%]{display:grid;grid-template-columns:3.3fr 16.625rem;gap:2rem}.image-container[_ngcontent-%COMP%]{position:relative;width:100%;height:485px;margin-bottom:6.75rem;border-radius:1rem;overflow:hidden}.image-container[_ngcontent-%COMP%]   .banner[_ngcontent-%COMP%]{position:absolute;width:1180px;top:-10%;left:50%;transform:translate(-50%)}.image-container[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{position:absolute;bottom:2rem;left:50%;width:17rem;transform:translate(-50%);filter:drop-shadow(1px 1px 3px rgba(0,0,0,.5))}.date[_ngcontent-%COMP%]{font-size:1.125rem;font-weight:500;color:var(--quartenary-color);margin-bottom:1.25rem}.date[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:1.125rem;color:var(--primary-color)}.gameplay[_ngcontent-%COMP%], .conclusion[_ngcontent-%COMP%]{margin-bottom:4.375rem}.title[_ngcontent-%COMP%]{font-size:3.75rem;margin-bottom:2.5rem}.subtitle[_ngcontent-%COMP%]{font-size:1.5rem;color:var(--primary-color);margin-bottom:1.125rem}.share[_ngcontent-%COMP%]{display:flex;align-items:center;color:var(--quartenary-color);font-weight:500}.rating[_ngcontent-%COMP%]{background-color:var(--secondary-color);padding:3.438rem 2.375rem 1.875rem;border-radius:1rem;max-width:350px;margin-inline:auto;margin-bottom:3.438rem}.rating[_ngcontent-%COMP%] > h4[_ngcontent-%COMP%]{font-size:1.5rem;text-transform:uppercase;font-weight:700;font-style:italic;margin-bottom:3rem}.rating[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin-bottom:1.875rem}.rating[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;justify-content:space-between;color:var(--primary-color);font-weight:500;margin-bottom:.625rem}.rating[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--quartenary-color)}.rating[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{display:flex;align-items:baseline;justify-content:right;text-transform:uppercase;font-size:2.25rem}.rating[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]   .rating-number[_ngcontent-%COMP%]{font-size:2.25rem;color:var(--primary-color)}.rating[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]   .rating-number[_ngcontent-%COMP%]   .white-text[_ngcontent-%COMP%]{font-size:2.25rem;color:#fff}.rating[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]   .rating-title[_ngcontent-%COMP%]{font-size:1rem;font-style:italic;font-weight:500;color:var(--quartenary-color);margin-right:1rem}.author[_ngcontent-%COMP%]{background-color:#3a1854;padding:3.125rem 2rem}.author[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:flex;align-items:center;max-width:1180px;margin-inline:auto}.image-avatar[_ngcontent-%COMP%]{position:relative;min-height:7.313rem;min-width:7.313rem;margin-right:3.125rem;border-radius:50%;overflow:hidden}.image-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;width:100%}.author-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.5rem;margin-bottom:1.25rem}@media screen and (max-width: 1000px){.content[_ngcontent-%COMP%]{grid-template-columns:1fr}}@media screen and (max-width: 600px){.title[_ngcontent-%COMP%]{font-size:3rem}.author-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.2rem}.author-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.85rem}}@media screen and (max-width: 460px){.title[_ngcontent-%COMP%]{font-size:1.875rem}.author[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{flex-direction:column}.image-avatar[_ngcontent-%COMP%]{margin-right:0;margin-bottom:3rem}}",
					],
				}));
			const ux = [
				{ path: "", component: Co },
				{ path: "games", component: bo },
				{ path: "games/:id", component: Io },
				{ path: "blog", component: Mo },
				{ path: "contact", component: Eo },
			];
			class Yr {}
			(Yr.ɵfac = function (t) {
				return new (t || Yr)();
			}),
				(Yr.ɵmod = Gt({ type: Yr })),
				(Yr.ɵinj = Tt({ imports: [Ia.forRoot(ux), Ia] }));
			class So {}
			(So.ɵfac = function (t) {
				return new (t || So)();
			}),
				(So.ɵcmp = ue({
					type: So,
					selectors: [["app-footer"]],
					decls: 19,
					vars: 0,
					consts: [
						[1, "container__footer"],
						[1, "container-content"],
						["src", "./assets/footer-left-pic.webp", "alt", ""],
						["href", ""],
						["src", "./assets/logo.webp", "alt", ""],
						["href", "https://github.com/BrennoFruhauf"],
						["href", "https://colorlib.com/wp/templates/"],
						["src", "./assets/footer-right-pic.webp", "alt", ""],
					],
					template: function (t, n) {
						1 & t &&
							(C(0, "div", 0)(1, "div", 1),
							$(2, "img", 2),
							C(3, "div")(4, "a", 3),
							$(5, "img", 4),
							D(),
							$(6, "app-items-menu")(7, "app-social-media"),
							C(8, "p"),
							I(9, " Copyright \xa92023 All rights reserved "),
							$(10, "br"),
							I(11, " This template was copied by "),
							C(12, "a", 5),
							I(13, "Brenno Fruhauf"),
							D(),
							I(14, " from "),
							C(15, "a", 6),
							I(16, "Colorlib"),
							D(),
							I(17, " to practice. "),
							D()(),
							$(18, "img", 7),
							D()());
					},
					dependencies: [Gr, Qn],
					styles: [
						"a[_ngcontent-%COMP%]:hover{color:var(--primary-color)}.container__footer[_ngcontent-%COMP%]{padding:3.75rem 2rem 1.563rem;background:linear-gradient(to right,#330d38 0%,#190d36 100%)}.container__footer[_ngcontent-%COMP%]   .container-content[_ngcontent-%COMP%]{display:flex;position:relative;flex-direction:row;flex-wrap:nowrap;justify-content:center;align-items:center;max-width:1175px;margin-inline:auto}.container__footer[_ngcontent-%COMP%]   .container-content[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:first-child{position:absolute;bottom:0;left:0}.container__footer[_ngcontent-%COMP%]   .container-content[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:last-child{position:absolute;bottom:0;right:0}.container__footer[_ngcontent-%COMP%]   .container-content[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.container__footer[_ngcontent-%COMP%]   .container-content[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   app-items-menu[_ngcontent-%COMP%]{display:block;margin-top:3.31rem}.container__footer[_ngcontent-%COMP%]   .container-content[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   app-social-media[_ngcontent-%COMP%]{display:block;margin:2.5rem 0}.container__footer[_ngcontent-%COMP%]   .container-content[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{color:#9190a5;opacity:.2}.container__footer[_ngcontent-%COMP%]   .container-content[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:center;font-size:.75rem;font-weight:500}.container__footer[_ngcontent-%COMP%]   .container-content[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:.75rem;font-weight:500}.container__footer[_ngcontent-%COMP%]   .container-content[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:visited{color:#9190a5}.container__footer[_ngcontent-%COMP%]   .container-content[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline;color:var(--quartenary-color)}@media screen and (max-width: 1000px){.container-content[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:first-child{display:none}.container-content[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:last-child{display:none}.container-content[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   app-items-menu[_ngcontent-%COMP%]{display:none!important}}",
					],
				}));
			class Po {}
			(Po.ɵfac = function (t) {
				return new (t || Po)();
			}),
				(Po.ɵcmp = ue({
					type: Po,
					selectors: [["app-newsletter"]],
					decls: 7,
					vars: 1,
					consts: [
						[1, "container__newsletter"],
						["action", ""],
						[
							"type",
							"text",
							"placeholder",
							"ENTER YOUR E-MAIL",
							"name",
							"",
							"id",
							"",
						],
						[3, "label"],
					],
					template: function (t, n) {
						1 & t &&
							(C(0, "div", 0)(1, "div")(2, "h2"),
							I(3, "Subscribe to our newsletter"),
							D(),
							C(4, "form", 1),
							$(5, "input", 2)(6, "app-stylized-button", 3),
							D()()()),
							2 & t && (K(6), Ae("label", "Subscribe"));
					},
					dependencies: [Kr],
					styles: [
						".container__newsletter[_ngcontent-%COMP%]{background:linear-gradient(to right,#3e0f3d 0%,#1c0f3b 100%);padding:6.75rem 2rem 5.938rem}.container__newsletter[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;max-width:1175px;margin-inline:auto}.container__newsletter[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:3rem;font-weight:700;font-style:italic;text-align:center;text-transform:uppercase;margin-bottom:4.563rem}.container__newsletter[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:1.625rem;align-items:baseline;justify-content:center}.container__newsletter[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-size:.875rem;font-weight:700;font-style:italic;color:#fff;width:787px;border:none;border-bottom:2px solid #9b91a6;background:none;height:3.938rem}.container__newsletter[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   app-stylized-button[_ngcontent-%COMP%]{display:block}@media screen and (max-width: 880px){.container__newsletter[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:530px}}@media screen and (max-width: 600px){.container__newsletter[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:auto}.container__newsletter[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:2rem;width:auto}}",
					],
				}));
			const lx = function (e) {
				return { "background-image": e };
			};
			class To {
				constructor() {
					(this.bgLink = "./assets/bg-menu-home.webp"),
						(this.url = "");
				}
				ngOnInit() {
					this.url = `url('${this.bgLink}')`;
				}
			}
			function cx(e, t) {
				1 & e && $(0, "app-complete-menu");
			}
			(To.ɵfac = function (t) {
				return new (t || To)();
			}),
				(To.ɵcmp = ue({
					type: To,
					selectors: [["app-complete-menu"]],
					inputs: { bgLink: "bgLink" },
					decls: 2,
					vars: 3,
					consts: [[3, "ngStyle"]],
					template: function (t, n) {
						1 & t && (C(0, "header", 0), $(1, "app-menu"), D()),
							2 & t && Ae("ngStyle", ks(1, lx, n.url));
					},
					dependencies: [ey, Wr],
					styles: [
						"header[_ngcontent-%COMP%]{padding:0 2rem 4.2rem;background-repeat:no-repeat;background-size:cover;background-position:top center}",
					],
				}));
			class Oo {
				constructor(t) {
					this.route = t;
				}
			}
			(Oo.ɵfac = function (t) {
				return new (t || Oo)(P(Xe));
			}),
				(Oo.ɵcmp = ue({
					type: Oo,
					selectors: [["app-root"]],
					decls: 4,
					vars: 1,
					consts: [[4, "ngIf"]],
					template: function (t, n) {
						1 & t &&
							(Ni(0, cx, 1, 0, "app-complete-menu", 0),
							$(1, "router-outlet")(2, "app-newsletter")(3, "app-footer")),
							2 & t && Ae("ngIf", "/" !== n.route.url);
					},
					dependencies: [Yv, So, Po, To, Jc],
				}));
			class Zn {}
			(Zn.ɵfac = function (t) {
				return new (t || Zn)();
			}),
				(Zn.ɵmod = Gt({ type: Zn })),
				(Zn.ɵinj = Tt({ imports: [Ec, Ia] }));
			class Xr {}
			(Xr.ɵfac = function (t) {
				return new (t || Xr)();
			}),
				(Xr.ɵmod = Gt({ type: Xr })),
				(Xr.ɵinj = Tt({ imports: [Ec, Zn, Ia] }));
			class Jr {}
			(Jr.ɵfac = function (t) {
				return new (t || Jr)();
			}),
				(Jr.ɵmod = Gt({ type: Jr, bootstrap: [Oo] })),
				(Jr.ɵinj = Tt({ imports: [f1, Zn, Xr, Yr] })),
				d1()
					.bootstrapModule(Jr)
					.catch((e) => console.error(e));
		},
	},
	(ie) => {
		ie((ie.s = 119));
	},
]);
