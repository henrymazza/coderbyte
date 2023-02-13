const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns same key when the same input", () => {
    const trivialKey1 = deterministicPartitionKey('abc');
    const trivialKey2 = deterministicPartitionKey('abc');

    expect(trivialKey1).toEqual(trivialKey2);
  } )

  it("Returns partition key if already present in object", () => {
    var key1 = {};
    key1.partitionKey = "sameKey"

    expect(deterministicPartitionKey(key1)).toEqual("sameKey");
  } )

  it("Returns stringified partition key if already present but in another type", () => {
    let key1 = {};
    key1.partitionKey = 12345.678

    expect(deterministicPartitionKey(key1)).toEqual("12345.678");
  } )

  it("Creates new hash if partition key is larger than MAX_PARTITION_KEY_LENGTH", () => {
    const str = 'X'.repeat('260');
    const key1 = {partitionKey: str};

    expect(deterministicPartitionKey(key1).length).toEqual(128);
  } )

});
