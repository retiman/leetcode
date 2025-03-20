import subprocess


def run_cmd(cmd):
    subprocess.run(cmd, shell=True, check=True)


def run_all():
    run_format()
    run_lint()
    run_tests()


def run_lint():
    run_cmd("poetry run ruff check --fix src test")
    run_cmd("poetry run pyright src test")


def run_format():
    run_cmd("poetry run black src test")
    run_cmd("poetry run isort src test")


def run_tests():
    run_cmd("poetry run pytest test")
