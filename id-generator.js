class IdGenerator {
  getId() {
    const uuid = crypto.randomUUID();
    return uuid;
  }
}