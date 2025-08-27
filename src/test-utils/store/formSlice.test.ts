import { expect } from "vitest";
import formSlice, { addEntry, selectEntries } from "../../store/formSlice";

const mockEntryData = {
  name: "John",
  age: 25,
  email: "john@example.com",
  password: "Password1!",
  gender: "male",
  acceptTc: true,
  image: "image/png;base64,abc",
  country: "United States",
};

describe("formSlice", () => {
  test("adds new entry with id and isNew: true", () => {
    const state = formSlice(
      { entries: [], countries: [] },
      addEntry(mockEntryData),
    );

    expect(state.entries).toHaveLength(1);

    const addedEntry = state.entries[0];

    expect(addedEntry.name).toBe(mockEntryData.name);
    expect(addedEntry.age).toBe(mockEntryData.age);
    expect(addedEntry.email).toBe(mockEntryData.email);
    expect(addedEntry.password).toBe(mockEntryData.password);
    expect(addedEntry.gender).toBe(mockEntryData.gender);
    expect(addedEntry.acceptTc).toBe(mockEntryData.acceptTc);
    expect(addedEntry.image).toBe(mockEntryData.image);
    expect(addedEntry.country).toBe(mockEntryData.country);

    expect(addedEntry.id).toBeDefined();
    expect(typeof addedEntry.id).toBe("string");
  });

  test("selectEntries returns entries", () => {
    const state = {
      formData: {
        entries: [
          {
            id: "abc",
            ...mockEntryData,
            isNew: true,
          },
        ],
        countries: ["United States"],
      },
    };

    expect(selectEntries(state)).toEqual([
      {
        id: "abc",
        ...mockEntryData,
        isNew: true,
      },
    ]);
  });
});
