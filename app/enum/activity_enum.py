from enum import Enum

class ActivityType(str, Enum):
    CALL = "CALL"
    MEETING = "MEETING"
    TASK = "TASK"
    EMAIL = "EMAIL"

class ActivityStatus(str, Enum):
    PENDING = "PENDING"
    DONE = "DONE"