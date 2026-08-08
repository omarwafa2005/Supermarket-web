export const getTimestamp = (value) => {
  const time = new Date(value || 0).getTime();

  return Number.isFinite(time) ? time : 0;
};

export const mergeByUpdatedAt = (
  localItems = [],
  remoteItems = [],
  idKey = "id"
) => {
  const merged = new Map();

  const addItem = (item) => {
    const id = item?.[idKey] ?? item?.id;

    if (id === undefined || id === null || id === "") {
      return;
    }

    const key = String(id);
    const existingItem = merged.get(key);

    if (!existingItem) {
      merged.set(key, item);
      return;
    }

    const existingTime = getTimestamp(
      existingItem.updatedAt || existingItem.createdAt
    );
    const incomingTime = getTimestamp(
      item.updatedAt || item.createdAt
    );

    merged.set(key, incomingTime >= existingTime ? item : existingItem);
  };

  localItems.forEach(addItem);
  remoteItems.forEach(addItem);

  return Array.from(merged.values());
};

export const stampRecord = (record = {}, defaults = {}) => {
  const now = new Date().toISOString();

  return {
    ...record,
    ...defaults,
    createdAt: record.createdAt || now,
    updatedAt: record.updatedAt || now,
  };
};
