import pool from "../../config/db";

export const mapSectorsToTitle = async (
  sectorTitleId: number,
  sectorIds: number[]
) => {
  if (sectorIds.length === 0) return;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    /**
     * Map ONLY the selected sectors
     * Do NOT unmap others
     */
    await conn.query(
      `UPDATE sector
       SET sector_title_id = ?
       WHERE id IN (?)`,
      [sectorTitleId, sectorIds]
    );

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
