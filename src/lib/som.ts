/**
 * Sound Design Procedural para H.M. Borçato
 * 
 * Sintetizado puramente via Web Audio API do navegador.
 * Zero dependências externas, zero arquivos MP3/WAV, zero bytes de rede.
 * Desligado por padrão (opt-in respeitoso).
 */

class MotorSonoro {
  private ctx: AudioContext | null = null;
  private ativo = false;

  constructor() {
    // Carrega preferência persistida se houver
    if (typeof window !== "undefined") {
      try {
        this.ativo = localStorage.getItem("hmb_som") === "1";
      } catch {
        this.ativo = false;
      }
    }
  }

  public get estaAtivo(): boolean {
    return this.ativo;
  }

  public alternar(): boolean {
    this.ativo = !this.ativo;
    try {
      localStorage.setItem("hmb_som", this.ativo ? "1" : "0");
    } catch {
      // Ignora restrições de localStorage
    }
    if (this.ativo) {
      this.iniciar();
      this.clique();
    }
    return this.ativo;
  }

  private iniciar() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Clique mecânico de relé industrial (curto, seco, tátil)
   */
  public clique() {
    if (!this.ativo) return;
    this.iniciar();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.04);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Falha silenciosa
    }
  }

  /**
   * Micro-tick de alta frequência para passagem / hover sutil
   */
  public tique() {
    if (!this.ativo) return;
    this.iniciar();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.015);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // Falha silenciosa
    }
  }

  /**
   * Pulso grave harmônico (quando uma peça se encaixa ou carro acende)
   */
  public pulso() {
    if (!this.ativo) return;
    this.iniciar();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const sub = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(75, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);

      sub.type = "triangle";
      sub.frequency.setValueAtTime(110, now);
      sub.frequency.exponentialRampToValueAtTime(55, now + 0.25);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      sub.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      sub.start(now);
      osc.stop(now + 0.26);
      sub.stop(now + 0.26);
    } catch {
      // Falha silenciosa
    }
  }
}

export const som = new MotorSonoro();
