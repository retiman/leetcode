import os


def pytest_sessionfinish():
    snap_init = "snapshots/__init__.py"
    if os.path.exists(snap_init):
        os.remove(snap_init)
