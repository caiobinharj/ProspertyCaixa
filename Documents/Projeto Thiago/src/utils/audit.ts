import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuditLogData {
  userId?: string;
  assetId?: string;
  action: string;
  entityType: string;
  entityId: string;
  changes?: any;
  ipAddress?: string;
  userAgent?: string;
}

export async function createAuditLog(data: AuditLogData) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: data.userId,
        assetId: data.assetId,
        action: data.action,
        entityType: data.entityType,
        entityId: data.entityId,
        changes: data.changes,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent
      }
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw - audit logging should not break main flow
  }
}


