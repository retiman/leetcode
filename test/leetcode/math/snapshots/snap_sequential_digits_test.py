# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['test_case_1 1'] = [
    123,
    234
]

snapshots['test_case_2 1'] = [
    1234,
    2345,
    3456,
    4567,
    5678,
    6789,
    12345
]
