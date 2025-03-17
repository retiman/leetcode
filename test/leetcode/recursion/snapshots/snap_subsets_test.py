# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['test_case_1 1'] = set([
    frozenset([
        2
    ]),
    frozenset([
        2,
        3
    ]),
    frozenset([
        1,
        2
    ]),
    frozenset([
        3
    ]),
    frozenset([
    ]),
    frozenset([
        1
    ]),
    frozenset([
        1,
        2,
        3
    ]),
    frozenset([
        1,
        3
    ])
])
