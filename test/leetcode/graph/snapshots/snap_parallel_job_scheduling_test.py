# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['test_case_1 1'] = [
    [
        'A'
    ],
    [
        'C',
        'B'
    ],
    [
        'D',
        'F',
        'E'
    ]
]

snapshots['test_case_2 1'] = [
    [
        'D',
        'E'
    ],
    [
        'F',
        'A'
    ],
    [
        'G',
        'C',
        'B'
    ]
]
