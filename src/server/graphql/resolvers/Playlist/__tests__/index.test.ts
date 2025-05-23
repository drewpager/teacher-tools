import { playlistResolvers } from "../index";
import { Db, Collection } from "mongodb";

// Mock data for playlists
const mockPlaylists = [
  { _id: "1", name: "Playlist 1", plan: [], creator: "userA", public: true, premium: false, level: "Beginner", category: ["Tech"] },
  { _id: "2", name: "Playlist 2", plan: [], creator: "userB", public: false, premium: true, level: "Intermediate", category: ["Music"] },
  { _id: "3", name: "Playlist 3", plan: [], creator: "userA", public: true, premium: false, level: "Advanced", category: ["Art"] },
  { _id: "4", name: "Playlist 4", plan: [], creator: "userC", public: true, premium: true, level: "Beginner", category: ["Tech", "Education"] },
  { _id: "5", name: "Playlist 5", plan: [], creator: "userD", public: false, premium: false, level: "Intermediate", category: ["Lifestyle"] },
  { _id: "6", name: "Playlist 6", plan: [], creator: "userA", public: true, premium: false, level: "Advanced", category: ["Gaming"] },
  { _id: "7", name: "Playlist 7", plan: [], creator: "userE", public: true, premium: true, level: "Beginner", category: ["Education"] },
  { _id: "8", name: "Playlist 8", plan: [], creator: "userB", public: false, premium: false, level: "Intermediate", category: ["Tech"] },
  { _id: "9", name: "Playlist 9", plan: [], creator: "userF", public: true, premium: true, level: "Advanced", category: ["Music", "Art"] },
  { _id: "10", name: "Playlist 10", plan: [], creator: "userC", public: true, premium: false, level: "Beginner", category: ["Lifestyle"] },
  { _id: "11", name: "Playlist 11", plan: [], creator: "userG", public: false, premium: true, level: "Intermediate", category: ["Gaming"] },
  { _id: "12", name: "Playlist 12", plan: [], creator: "userA", public: true, premium: false, level: "Advanced", category: ["Tech", "Education"] },
];

const mockDb = {
  playlists: {
    countDocuments: jest.fn(),
    find: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    toArray: jest.fn(),
  } as unknown as Collection, // Cast to Collection to satisfy TypeScript
} as Db;

describe("playlistResolvers.Query.allplaylists", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  // Test Case 1: Empty Collection
  test("should return empty result when no playlists are in the database", async () => {
    (mockDb.playlists.countDocuments as jest.Mock).mockResolvedValue(0);
    (mockDb.playlists.find({}).limit(10).skip(0).toArray as jest.Mock).mockResolvedValue([]);
    
    const result = await playlistResolvers.Query.allplaylists(
      undefined,
      { limit: 10, page: 1 },
      { db: mockDb }
    );

    expect(mockDb.playlists.countDocuments).toHaveBeenCalledWith({});
    expect(mockDb.playlists.find).toHaveBeenCalledWith({});
    expect(mockDb.playlists.skip).toHaveBeenCalledWith(0);
    expect(mockDb.playlists.limit).toHaveBeenCalledWith(10);
    expect(mockDb.playlists.toArray).toHaveBeenCalled();

    expect(result.totalCount).toBe(0);
    expect(result.result).toEqual([]);
    expect(result.total).toBe(0);
  });

  // Test Case 2: Single Page of Playlists
  test("should return all playlists when count is less than or equal to limit", async () => {
    const playlists = mockPlaylists.slice(0, 3);
    (mockDb.playlists.countDocuments as jest.Mock).mockResolvedValue(playlists.length);
    (mockDb.playlists.find({}).limit(5).skip(0).toArray as jest.Mock).mockResolvedValue(playlists);

    const result = await playlistResolvers.Query.allplaylists(
      undefined,
      { limit: 5, page: 1 },
      { db: mockDb }
    );
    
    expect(mockDb.playlists.countDocuments).toHaveBeenCalledWith({});
    expect(mockDb.playlists.find).toHaveBeenCalledWith({});
    expect(mockDb.playlists.skip).toHaveBeenCalledWith(0);
    expect(mockDb.playlists.limit).toHaveBeenCalledWith(5);
    expect(mockDb.playlists.toArray).toHaveBeenCalled();

    expect(result.totalCount).toBe(playlists.length);
    expect(result.result).toEqual(playlists);
    expect(result.total).toBe(playlists.length);
  });

  // Test Case 3: Multiple Pages of Playlists
  describe("when there are multiple pages of playlists", () => {
    beforeEach(() => {
      (mockDb.playlists.countDocuments as jest.Mock).mockResolvedValue(mockPlaylists.length);
    });

    test("should return the first page of playlists", async () => {
      const limit = 5;
      const page = 1;
      const expectedPlaylists = mockPlaylists.slice(0, limit);
      (mockDb.playlists.find({}).limit(limit).skip(0).toArray as jest.Mock).mockResolvedValue(expectedPlaylists);

      const result = await playlistResolvers.Query.allplaylists(
        undefined,
        { limit, page },
        { db: mockDb }
      );

      expect(mockDb.playlists.countDocuments).toHaveBeenCalledWith({});
      expect(mockDb.playlists.find).toHaveBeenCalledWith({});
      expect(mockDb.playlists.skip).toHaveBeenCalledWith(0);
      expect(mockDb.playlists.limit).toHaveBeenCalledWith(limit);
      expect(mockDb.playlists.toArray).toHaveBeenCalled();

      expect(result.totalCount).toBe(mockPlaylists.length);
      expect(result.result).toEqual(expectedPlaylists);
      expect(result.total).toBe(expectedPlaylists.length);
    });

    test("should return the second page of playlists", async () => {
      const limit = 5;
      const page = 2;
      const skipAmount = (page - 1) * limit;
      const expectedPlaylists = mockPlaylists.slice(skipAmount, skipAmount + limit);
      (mockDb.playlists.find({}).limit(limit).skip(skipAmount).toArray as jest.Mock).mockResolvedValue(expectedPlaylists);
      
      const result = await playlistResolvers.Query.allplaylists(
        undefined,
        { limit, page },
        { db: mockDb }
      );

      expect(mockDb.playlists.countDocuments).toHaveBeenCalledWith({});
      expect(mockDb.playlists.find).toHaveBeenCalledWith({});
      expect(mockDb.playlists.skip).toHaveBeenCalledWith(skipAmount);
      expect(mockDb.playlists.limit).toHaveBeenCalledWith(limit);
      expect(mockDb.playlists.toArray).toHaveBeenCalled();

      expect(result.totalCount).toBe(mockPlaylists.length);
      expect(result.result).toEqual(expectedPlaylists);
      expect(result.total).toBe(expectedPlaylists.length);
    });

    test("should return empty result for a page beyond available playlists", async () => {
      const limit = 5;
      const page = 10; // A page that should be empty
      const skipAmount = (page - 1) * limit;
      (mockDb.playlists.find({}).limit(limit).skip(skipAmount).toArray as jest.Mock).mockResolvedValue([]);

      const result = await playlistResolvers.Query.allplaylists(
        undefined,
        { limit, page },
        { db: mockDb }
      );

      expect(mockDb.playlists.countDocuments).toHaveBeenCalledWith({});
      expect(mockDb.playlists.find).toHaveBeenCalledWith({});
      expect(mockDb.playlists.skip).toHaveBeenCalledWith(skipAmount);
      expect(mockDb.playlists.limit).toHaveBeenCalledWith(limit);
      expect(mockDb.playlists.toArray).toHaveBeenCalled();

      expect(result.totalCount).toBe(mockPlaylists.length);
      expect(result.result).toEqual([]);
      expect(result.total).toBe(0);
    });
  });
  
  // Test Case 4: Varying Limits
  test("should handle varying limits correctly", async () => {
    (mockDb.playlists.countDocuments as jest.Mock).mockResolvedValue(mockPlaylists.length);

    // Limit 1: Small limit
    const limit1 = 3;
    const page1 = 1;
    const expectedPlaylists1 = mockPlaylists.slice(0, limit1);
    (mockDb.playlists.find({}).limit(limit1).skip(0).toArray as jest.Mock).mockResolvedValueOnce(expectedPlaylists1);

    const result1 = await playlistResolvers.Query.allplaylists(
      undefined,
      { limit: limit1, page: page1 },
      { db: mockDb }
    );

    expect(result1.totalCount).toBe(mockPlaylists.length);
    expect(result1.result).toEqual(expectedPlaylists1);
    expect(result1.total).toBe(expectedPlaylists1.length);
    expect(mockDb.playlists.limit).toHaveBeenLastCalledWith(limit1);

    // Limit 2: Larger limit (but still less than total)
    const limit2 = 7;
    const page2 = 1; // Reset to page 1 for this limit
    const expectedPlaylists2 = mockPlaylists.slice(0, limit2);
     (mockDb.playlists.find({}).limit(limit2).skip(0).toArray as jest.Mock).mockResolvedValueOnce(expectedPlaylists2);

    const result2 = await playlistResolvers.Query.allplaylists(
      undefined,
      { limit: limit2, page: page2 },
      { db: mockDb }
    );

    expect(result2.totalCount).toBe(mockPlaylists.length);
    expect(result2.result).toEqual(expectedPlaylists2);
    expect(result2.total).toBe(expectedPlaylists2.length);
    expect(mockDb.playlists.limit).toHaveBeenLastCalledWith(limit2);

    // Limit 3: Limit greater than total playlists
    const limit3 = 20; // Greater than mockPlaylists.length
    const page3 = 1;
    const expectedPlaylists3 = mockPlaylists.slice(0, mockPlaylists.length); // Should return all
    (mockDb.playlists.find({}).limit(limit3).skip(0).toArray as jest.Mock).mockResolvedValueOnce(expectedPlaylists3);

    const result3 = await playlistResolvers.Query.allplaylists(
      undefined,
      { limit: limit3, page: page3 },
      { db: mockDb }
    );

    expect(result3.totalCount).toBe(mockPlaylists.length);
    expect(result3.result).toEqual(expectedPlaylists3);
    expect(result3.total).toBe(expectedPlaylists3.length);
    expect(mockDb.playlists.limit).toHaveBeenLastCalledWith(limit3);
  });
});
