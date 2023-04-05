type Listener = (...args: any[]) => void;

class EventEmitter {
  private events: Record<string, Listener[]> = {};
  public on(eventName: string, listener: Listener): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }
  public emit(eventName: string, ...args: any[]): void {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }
  public off(eventName: string, listener: Listener): void {
    const listeners = this.events[eventName];
    if (listeners) {
      this.events[eventName] = listeners.filter(l => l !== listener);
    }
  }
  public once(eventName: string, listener: Listener): void {
    const wrapper = (...args: any[]) => {
      listener(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}

export default EventEmitter