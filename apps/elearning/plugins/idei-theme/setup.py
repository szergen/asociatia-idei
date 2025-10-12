from setuptools import setup, find_packages

setup(
    name="tutor-contrib-idei-theme",
    version="1.0.0",
    description="Custom OpenEDX theme for Asociatia IDEI",
    author="Asociatia IDEI",
    author_email="contact@asociatia-idei.eu",
    url="https://github.com/asociatia-idei/openedx-theme",
    packages=find_packages(),
    include_package_data=True,
    install_requires=["tutor>=15.0.0,<16.0.0"],
    entry_points={
        "tutor.plugin.v1": [
            "idei-theme = tutorideitheme.plugin"
        ]
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Education",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
)

